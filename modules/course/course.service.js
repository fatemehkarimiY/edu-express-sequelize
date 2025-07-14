const createHttpError = require("http-errors");
const courseMessages = require("./course.messages");
const Course = require("./course.model");
const User = require("../user/user.model");
const Enrollment = require("../enrollment/enrollment.model");
const Session = require("../session/session.model");
const { USER_ROLE, ENROLLMENT_STATUS } = require("../../constants/enums");
const Profile = require("../profile/profile.model");
const { Op } = require("sequelize");
const sequelize = require("../../config/sequelize");

async function create({ payload, role, userId }) {
  let {
    teacherId,
    title,
    description,
    price = 0,
    payable_price = 0,
    status = "draft",
    capacity = null,
  } = payload;

  //check teacherId based on role
  if (role === USER_ROLE.TEACHER) {
    teacherId = userId;
  } else if (!teacherId)
    throw createHttpError.NotFound(courseMessages.teacherNotFound);

  //check user is teacher
  const teacher = await User.findOne({
    where: { id: teacherId, role: USER_ROLE.TEACHER },
  });
  if (!teacher) {
    throw createHttpError.NotFound(courseMessages.teacherNotFound);
  }

  // the course already exists
  const existingCourse = await Course.findOne({ where: { title, teacherId } });
  if (existingCourse) {
    throw createHttpError.Conflict(courseMessages.courseAlreadyExists);
  }

  const course = await Course.create({
    teacherId,
    title,
    description,
    price,
    payable_price: payable_price || price,
    status,
    capacity,
  });

  return course;
}

async function update({ courseId, payload, role }) {
  let { teacherId, title } = payload;

  //find course
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw createHttpError.NotFound(courseMessages.courseNotFound);
  }

  // validate teacher if teacherId has changed
  if (teacherId && teacherId !== course.teacherId) {
    const teacher = await User.findOne({
      where: { role: USER_ROLE.TEACHER, id: teacherId },
    });
    if (!teacher) {
      throw createHttpError.NotFound(courseMessages.teacherNotFound);
    }
    course.teacherId = teacherId;
  }

  //if title or teacherId has changed check for duplicate
  if (title || teacherId) {
    const duplicate = await Course.findOne({
      where: {
        id: { [Op.ne]: courseId },
        teacherId: course.teacherId,
        title: course.title,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (duplicate) {
      throw createHttpError.Conflict(courseMessages.courseAlreadyExists);
    }
  }

  const updatableFields = [
    "description",
    "price",
    "payablePrice",
    "capacity",
    "status",
  ];
  for (const key of updatableFields) {
    if (payload.hasOwnProperty(key)) {
      course[key] = payload[key];
    }
  }
  await course.save();
  return course;
}

async function remove({ id, userId, role }) {
  const course = await Course.findByPk(id);
  if (!course) {
    throw createHttpError.BadRequest(courseMessages.courseNotFound);
  }
  if (role === USER_ROLE.TEACHER) {
    if (course.teacherId !== userId) {
      throw createHttpError.BadRequest(courseMessages.courseNotBelongToYou);
    }
  }

  await course.destroy();
}
async function getById(id) {
  const course = await Course.scope("withTeacher").findByPk(id);
  if (!course) {
    throw createHttpError.BadRequest(courseMessages.courseNotFound);
  }
  return course;
}

async function getList({ queryParameters, userId, role }) {
  //todo
  // const { title, status, is_capacity_completed } = queryParameters;
  const courses = await Course.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { ...(role === USER_ROLE.TEACHER && { teacherId: userId }) },
  });
  return courses;
}

async function getCourseSessions(courseId) {
  const result = await Session.findAll({
    where: { courseId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return result;
}

async function getCourseStudents(courseId) {
  const enrollments = await Enrollment.findAll({
    where: { courseId, status: ENROLLMENT_STATUS.COMPLETED },
    include: {
      model: User,
      as: "user",
      attributes: ["mobile"],
      include: {
        model: Profile,
        as: "profile",
        attributes: ["fullName", "avatar", "birthDate"],
      },
    },
    raw: true,
  });

  return enrollments.map(({ user }) => ({
    mobile: user.mobile,
    ...user.profile,
  }));
}
async function getCompleteCoursesStats() {
  const query = `select 
                    c.id as course_id,
                    c.title,
                    p.fullname as teacher,
                    u.mobile as teacher_mobile,
                    COUNT(DISTINCT  e.id) as students_count,
                    COUNT(DISTINCT s.id) as sessions_count,
                    COUNT(DISTINCT CASE WHEN s.status = 'draft' THEN s.id END) as draft_session_count,
                    COUNT(DISTINCT CASE WHEN s.status = 'finished' THEN s.id END) as finished_session_count,
                    COUNT(DISTINCT CASE WHEN s.status = 'cancelled' THEN s.id END) as cancelled_session_count,
                    COUNT(DISTINCT CASE WHEN s.status = 'not_formed' THEN s.id END) as not_formed_session_count,
                  from course c 
                  JOIN user u on c.teacher_id = u.id
                  LEFT JOIN profile p on p.user_id = u.id
                  LEFT JOIN enrollment e on e.course_id= c.id
                  LEFT JOIN session s on c.id = s.course_id
                  GROUP BY c.id, c.title, u.mobile, p.fullname`;

  const result = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  return result;
}
module.exports = {
  create,
  remove,
  update,
  getList,
  getCourseSessions,
  getCourseStudents,
  getById,
  getCompleteCoursesStats,
};

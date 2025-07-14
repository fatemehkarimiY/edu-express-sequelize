const Enrollment = require("./enrollment.model");
const createHttpError = require("http-errors");
const { ENROLLMENT_STATUS } = require("../../constants/enums");
const Course = require("../course/course.model");
const User = require("../user/user.model");
const EnrollmentMessages = require("./enrollment.message");
const sequelize = require("../../config/sequelize");
//todo check for expired time
async function create({ studentId, courseId }) {
  const enrollment = await Enrollment.findOne({
    where: { studentId: studentId, courseId },
  });

  if (enrollment) {
    if (enrollment.status === ENROLLMENT_STATUS.PENDING) {
      throw createHttpError.BadRequest("شما یک سفارش پرداخت نشده دارید.");
    }
    if (enrollment.status === ENROLLMENT_STATUS.COMPLETED) {
      throw createHttpError.BadRequest(
        "شما قبلا در این دوره ثبت نام کرده اید."
      );
    }
  }

  const course = await Course.findByPk(courseId);
  if (!course) {
    throw createHttpError.NotFound("درس وجود ندارد");
  }
  const allEnrollmentForThisCourse = await Enrollment.findAll({
    where: { courseId, status: ENROLLMENT_STATUS.COMPLETED },
  });
  if (allEnrollmentForThisCourse.length === course.capacity) {
    throw createHttpError.BadRequest("این درس تکمیل ظرفیت شده است");
  }
  await Enrollment.create({
    courseId,
    studentId,
  });
}

//todo add reason
async function cancelEnrollment({ userId, id, reason }) {
  const enrollment = await Enrollment.findOne({
    where: { studentId: userId, id },
  });
  if (!enrollment) {
    throw createHttpError.NotFound("یافت نشد");
  }
  if (enrollment.status === ENROLLMENT_STATUS.COMPLETED) {
    throw createHttpError.BadRequest("پرداخت این درس تکمیل شده است");
  }

  enrollment.status = ENROLLMENT_STATUS.CANCELED;
  await enrollment.save();
}
async function deleteEnrollment({ userId, id }) {
  const enrollment = await Enrollment.findOne({
    where: { studentId: userId, id },
  });
  if (!enrollment) {
    throw createHttpError.NotFound(EnrollmentMessages.NotFound);
  }
  if (enrollment.status === ENROLLMENT_STATUS.COMPLETED) {
    throw createHttpError.BadRequest("پرداخت این درس تکمیل شده است");
    //todo add return money
  }

  await enrollment.destroy();
}

async function getUserEnrollments({ userId, status }) {
  const enrollments = await Enrollment.findAll({
    where: { studentId: userId, status: status },
  });
  return enrollments;
}

//لیست دانش آموزانی که در دوره ها ثبت نام کرده اند.
async function getEnrolledStudents(queryParams) {
  const { status } = queryParams;
  const where = {};
  if (status) {
    where.status = status;
  }
  // const enrolledStudents = await User.findAll({
  //   include: [
  //     {
  //       model: Enrollment,
  //       as: "enrollment",
  //       required: true, //inner join
  //       where,
  //       include: [
  //         {
  //           model: Course,
  //           as: "course",
  //           attributes: ["title", "price", "payable_price"],
  //         },
  //       ],
  //     },
  //   ],
  // });

  // raw query
  let query = `SELECT
                u.id as user_id,
                p.fullname,
                c.title,
                c.payable_price,
                c.price ,
                e.status
              FROM user u
              JOIN enrollment e on e.student_id = u.id
              JOIN course c on e.course_id = c.id
              LEFT JOIN profile p on e.student_id = p.user_id`;

  const replacements = {};

  if (status) {
    query += ` WHERE e.status = :status`;
    replacements.status = status;
  }

  const results = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    replacements,
  });

  return results;
}

module.exports = {
  create,
  cancelEnrollment,
  deleteEnrollment,
  getUserEnrollments,
  getEnrolledStudents,
};

const createHttpError = require("http-errors");
const courseMessages = require("./course.messages");
const Course = require("./course.model");
const User = require("../user/user.model");
const Session = require("../session/session.model");
const { USER_ROLE } = require("../../constants/enums");

async function create({ payload, role, userId }) {
  let {
    teacherId,
    title,
    description,
    price,
    status,
    capacity,
    sessionLength,
  } = payload;

  if (!teacherId && role === USER_ROLE.TEACHER) {
    teacherId = userId;
  }
  if (!teacherId || !title) {
    throw createHttpError.BadRequest(courseMessages.invalidCourseData);
  }

  // Check if the course already exists
  const existingCourse = await Course.findOne({ where: { title, teacherId } });
  if (existingCourse) {
    throw createHttpError.Conflict(courseMessages.courseAlreadyExists);
  }

  const teacher = await User.findOne({
    where: { id: teacherId, role: USER_ROLE.TEACHER },
  });
  if (!teacher) {
    throw createHttpError.NotFound(courseMessages.teacherNotFound);
  }
  const course = await Course.create({
    teacherId: teacher.id,
    title,
  });

  if (description) {
    course.description = description;
  }
  if (price) {
    course.price = price;
  }
  if (status) {
    course.status = status;
  }
  if (capacity) {
    course.capacity = capacity;
  }

  // if (sessionLength) {
  //   const sessionList = [];
  //   Array.from({ length: sessionLength }, (v) => {
  //     sessionList.push({ courseId: course.id });
  //   });
  //   await Session.bulkCreate(sessionList);
  // }
  await course.save();
  return course;
}

module.exports = { create };

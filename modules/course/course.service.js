const createHttpError = require("http-errors");
const courseMessages = require("./course.messages");
const Course = require("./course.model");
const User = require("../user/user.model");
const Session = require("../session/session.model");
const { USER_ROLE } = require("../../constants/enums");

async function create({ payload, role, userId }) {
  let { teacherId, title, description, price, status, capacity } = payload;

  if (!teacherId && role === USER_ROLE.TEACHER) {
    teacherId = userId;
  }

  // the course already exists
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

  await course.save();
  return course;
}

async function update(payload) {
  const { id, title, teacherId, description, capacity, price, status } =
    payload;
  console.log(payload);
  const course = await Course.findByPk(id);
  if (!course) {
    throw createHttpError.NotFound(courseMessages.courseNotFound);
  }

  if (teacherId && teacherId !== course.teacherId) {
    const teacher = await User.findOne({
      where: { role: USER_ROLE.TEACHER, id: teacherId },
    });
    if (!teacher) {
      throw createHttpError.NotFound(courseMessages.teacherNotFound);
    }

    course.teacherId = teacherId;
  }

  if (title) {
    course.title = title;
  }

  if (title || teacherId) {
    const hasTeacherThisCourse = await Course.findOne({
      where: { teacherId: course.teacherId, title: course.title },
    });

    if (hasTeacherThisCourse) {
      throw createHttpError.Conflict(courseMessages.courseAlreadyExists);
    }
  }

  if (description || description === null || description === "") {
    course.description = description;
  }
  if (price || price === null) {
    course.price = price;
  }
  //todo check if capacity is less than the students
  if (capacity || capacity === null || capacity === "") {
    course.capacity = capacity;
  }

  if (status) {
    course.status = status;
  }

  await course.save();
  return course;
}

async function remove(id) {
  const course = await Course.findByPk(id);
  if (!course) {
    throw createHttpError.BadRequest(courseMessages.courseNotFound);
  }
  await course.destroy();
}

module.exports = { create, remove, update };

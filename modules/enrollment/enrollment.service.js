const User = require("../user/user.model");
const Enrollment = require("./enrollment.model");
const createHttpError = require("http-errors");
const EnrollmentMessages = require("./enrollment.message");
const { USER_ROLE } = require("../../constants/enums");
const Course = require("../course/course.model");

async function add({ studentId, courseId }) {
  if (!studentId || !courseId) {
    throw createHttpError.BadRequest(
      EnrollmentMessages.studentIdAndCourseIdRequired
    );
  }
  const enrollment = await Enrollment.findOne({
    where: { studentId: studentId, courseId },
  });
  if (enrollment) {
    throw createHttpError.Conflict(EnrollmentMessages.duplicateUser);
  }

  const user = await User.findOne({
    where: { id: studentId, role: USER_ROLE.STUDENT },
  });

  if (!user) {
    throw createHttpError.NotFound(EnrollmentMessages.studentNotFound);
  }
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw createHttpError.NotFound(EnrollmentMessages.courseNotFound);
  }

  //todo check capacity of course

  await Enrollment.create({
    courseId,
    studentId: studentId,
  });
}

module.exports = {
  add,
};

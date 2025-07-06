const Enrollment = require("./enrollment.model");
const createHttpError = require("http-errors");
const { ENROLLMENT_STATUS } = require("../../constants/enums");
const Course = require("../course/course.model");
const EnrollmentMessages = require("./enrollment.message");

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
    where: { studentId:userId, id },
  });
  if (!enrollment) {
    throw createHttpError.NotFound("یافت نشد");
  }
  if ((enrollment.status === ENROLLMENT_STATUS.COMPLETED)) {
    throw createHttpError.BadRequest("پرداخت این درس تکمیل شده است");
  }

  enrollment.status = ENROLLMENT_STATUS.CANCELED;
  await enrollment.save();
}
async function deleteEnrollment({ userId, id }) {
  const enrollment = await Enrollment.findOne({
    where: { studentId:userId, id },
  });
  if (!enrollment) {
    throw createHttpError.NotFound(EnrollmentMessages.NotFound);
  }
  if ((enrollment.status === ENROLLMENT_STATUS.COMPLETED)) {
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

module.exports = {
  create,
  cancelEnrollment,
  deleteEnrollment,
  getUserEnrollments,
};

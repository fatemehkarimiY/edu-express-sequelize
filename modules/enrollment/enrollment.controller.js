const EnrollmentMessages = require("./enrollment.message");
const enrollmentService = require("./enrollment.service");

async function create(req, res, next) {
  try {
    const userId = req.user;
    const { courseId } = req.body;

    await enrollmentService.create({ studentId: userId, courseId });
    res.status(201).json({
      message: EnrollmentMessages.success,
    });
  } catch (error) {
    next(error);
  }
}

/** @deprecated
 * it's unusual to delete an enrollment
 * */
async function remove(req, res, next) {
  try {
    const userId = req.user;
    const id = req.params.id;

    await enrollmentService.remove({ userId, id });
    res.status(200).json({
      message: EnrollmentMessages.remove,
    });
  } catch (error) {
    next(error);
  }
}
async function cancel(req, res, next) {
  try {
    const userId = req.user;
    const id = req.params.id;

    await enrollmentService.cancelEnrollment({ userId, id });
    res.status(200).json({
      message: EnrollmentMessages.success,
    });
  } catch (error) {
    next(error);
  }
}

async function getEnrollments(req, res, next) {
  try {
    const userId = req.user;
    const status = req.query?.status;

    const result = await enrollmentService.getUserEnrollments({
      userId,
      status,
    });
    res.status(200).json({
      message: EnrollmentMessages.success,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function getEnrolledStudents(req, res, next) {
  try {
    const result = await enrollmentService.getEnrolledStudents(req.query);
    res.status(200).json({
      message: EnrollmentMessages.success,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getEnrollments,
  remove,
  cancel,
  getEnrolledStudents,
};

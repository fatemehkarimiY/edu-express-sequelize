const EnrollmentMessages = require("./enrollment.message");
const enrollmentService = require("./enrollment.service");

async function create(req, res, next) {
  try {
    const { studentId, courseId } = req.body;

    await enrollmentService.add({ studentId, courseId });
    res.status(200).json({
      message: EnrollmentMessages.add,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };

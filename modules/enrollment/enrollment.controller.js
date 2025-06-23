const EnrollmentMessages = require("./enrollment.message");
const enrollmentService = require("./enrollment.service");

async function create(req, res, next) {
  try {
    const userId = req.user;
    const { courseId } = req.body;

    await enrollmentService.create({ studentId: userId, courseId });
    res.status(200).json({
      message: EnrollmentMessages.add,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };

const EnrollmentMessages = require("./enrollment.message");
const enrollmentService = require("./enrollment.service");

async function create(req, res, next) {
  try {
    const userId = req.user;
    const { courseId } = req.body;

    await enrollmentService.create({ studentId: userId, courseId });
    res.status(201).json({
      message: EnrollmentMessages.add,
    });
  } catch (error) {
    next(error);
  }
}
async function getPending(req, res, next) {
  try {
    const userId = req.user;

    const result = await enrollmentService.getPendingEnrollments(userId);
    res.status(201).json({
      message: EnrollmentMessages.getPending,
      data: result,
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
    res.status(201).json({
      message: EnrollmentMessages.getPending,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, getPending, getEnrollments };

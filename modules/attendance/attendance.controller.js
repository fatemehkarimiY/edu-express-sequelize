const attendanceMessages = require("./attendance.messages");
const attendanceService = require("./attendance.service");
async function create(req, res, next) {
  try {
    let payload = req.body;
    const attendance = await attendanceService.create(payload);
    res.status(200).json({
      message: attendanceMessages.attendanceCreated,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };

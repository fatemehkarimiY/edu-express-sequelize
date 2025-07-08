const attendanceMessages = require("./attendance.messages");
const attendanceService = require("./attendance.service");
async function create(req, res, next) {
  try {
    let payload = req.body;
    const role = req.role;
    const userId = req.user;
    const attendance = await attendanceService.create({
      payload,
      role,
      userId,
    });
    res.status(200).json({
      message: attendanceMessages.attendanceCreated,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}
async function update(req, res, next) {
  try {
    const id = req.params.id;
    let payload = { ...req.body, id };
    const role = req.role;
    const userId = req.user;
    const attendance = await attendanceService.update({
      payload,
      role,
      userId,
    });
    res.status(200).json({
      message: attendanceMessages.updated,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}
async function getList(req, res, next) {
  try {
    let params = req.params;
    const role = req.role;
    const userId = req.user;
    const attendance = await attendanceService.getList({
      params,
      role,
      userId,
    });
    res.status(200).json({
      message: attendanceMessages.updated,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}
async function remove(req, res, next) {
  try {
    let id = req.params.id;
    const role = req.role;
    const userId = req.user;
    const attendance = await attendanceService.remove({ id, role, userId });
    res.status(200).json({
      message: attendanceMessages.remove,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, update, remove,getList };

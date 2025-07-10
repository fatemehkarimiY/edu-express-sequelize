const teacherService = require("./teacher.service");

async function getList(req, res, next) {
  try {
    const teachers = await teacherService.getList(req.query);
    res.status(200).json({
      message: "success",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getList };

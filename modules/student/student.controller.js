const studentService = require("./student.service");

async function getList(req, res, next) {
  try {
    const userId = req.user;
    const role = req.role;

    const students = await studentService.getList({
      query: req.query,
      userId,
      role,
    });
    res.status(200).json({
      message: "success",
      data: students,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getList };

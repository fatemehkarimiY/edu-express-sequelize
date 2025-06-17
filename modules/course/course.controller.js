const { USER_ROLE } = require("../../constants/enums");
const courseMessages = require("./course.messages");
const courseService = require("./course.service");
async function create(req, res, next) {
  try {
    const role = req.role;
    let payload = req.body;
    const userId = req.user;
    const course = await courseService.create({ payload, role, userId });
    res
      .status(200)
      .json({ message: courseMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };

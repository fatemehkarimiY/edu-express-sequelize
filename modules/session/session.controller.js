const courseMessages = require("./session.messages");
const courseService = require("./session.service");
async function create(req, res, next) {
  try {
    let payload = req.body;
    const course = await courseService.create(payload);
    res
      .status(200)
      .json({ message: courseMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}

module.exports = { create };

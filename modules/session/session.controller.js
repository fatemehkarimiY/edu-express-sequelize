const sessionMessages = require("./session.messages");
const courseService = require("./session.service");
async function create(req, res, next) {
  try {
    let payload = req.body;
    const course = await courseService.create(payload);
    res
      .status(201)
      .json({ message: sessionMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}
async function update(req, res, next) {
  try {
    let payload = req.body;
    const sessionId = req.params.id;
    const course = await courseService.update({ ...payload, sessionId });
    res
      .status(201)
      .json({ message: sessionMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}
async function getById(req, res, next) {
  try {
    const sessionId = req.params.id;
    const course = await courseService.getById(sessionId);
    res
      .status(201)
      .json({ message: sessionMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}
async function remove(req, res, next) {
  try {
    const sessionId = req.params.id;
    await courseService.remove(sessionId);
    res.status(201).json({ message: sessionMessages.remove });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, update, getById,remove };

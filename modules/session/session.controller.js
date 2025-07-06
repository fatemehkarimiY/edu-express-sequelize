const sessionMessages = require("./session.messages");
const sessionService = require("./session.service");

async function create(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    let payload = req.body;
    const course = await sessionService.create({ payload, role, userId });
    res
      .status(201)
      .json({ message: sessionMessages.createSuccessfully, data: course });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    let payload = req.body;
    const sessionId = req.params.id;
    const course = await sessionService.update({
      payload: { ...payload, sessionId },
      role,
      userId
    });
    res
      .status(201)
      .json({ message: sessionMessages.updateSuccessfully, data: course });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const sessionId = req.params.id;
    const course = await sessionService.getById(sessionId);
    res.status(201).json({ message: sessionMessages.success, data: course });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const role = req.role;
    const userId = req.user;
    await sessionService.remove({ id, userId, role });
    res.status(201).json({ message: sessionMessages.remove });
  } catch (error) {
    next(error);
  }
}

async function getList(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    const data = await sessionService.getList({ userId, role });
    res.status(200).json({ message: sessionMessages.success, data });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, update, getById, remove, getList };

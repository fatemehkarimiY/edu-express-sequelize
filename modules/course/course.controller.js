const courseMessages = require("./course.messages");
const courseService = require("./course.service");
async function create(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    let payload = req.body;
    const course = await courseService.create({ payload, role, userId });
    res
      .status(201)
      .json({ message: courseMessages.courseCreated, data: course });
  } catch (error) {
    next(error);
  }
}

async function getList(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    const course = await courseService.getList({ role, userId });
    res.status(200).json({ message: courseMessages.success, data: course });
  } catch (error) {
    next(error);
  }
}

async function getCourseSessions(req, res, next) {
  try {
    const courseId = req.params?.courseId;
    const course = await courseService.getCourseSessions(courseId);
    res.status(200).json({ message: courseMessages.success, data: course });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    let payload = { ...req.body, id };
    const course = await courseService.update({ payload, courseId: id });
    res
      .status(200)
      .json({ message: courseMessages.courseUpdated, data: course });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const role = req.role;
    const userId = req.user;
    const id = req.params.id;
    const course = await courseService.remove({ id, role, userId });
    res
      .status(200)
      .json({ message: courseMessages.courseDeleted, data: course });
  } catch (error) {
    next(error);
  }
}
async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const course = await courseService.getById(id);
    res.status(200).json({ message: courseMessages.success, data: course });
  } catch (error) {
    next(error);
  }
}

async function getCourseStudents(req, res, next) {
  try {
    const courseId = req.params.courseId;
    const list = await courseService.getCourseStudents(courseId);
    res.status(200).json({ message: courseMessages.success, data: list });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  update,
  remove,
  getList,
  getCourseSessions,
  getCourseStudents,
  getById,
};

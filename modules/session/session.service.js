const createHttpError = require("http-errors");
const sessionMessages = require("./session.messages");
const Session = require("./session.model");
const Course = require("./../course/course.model");

async function create(payload) {
  let { courseId, date, description, status } = payload;

  if (!courseId) {
    throw createHttpError.BadRequest(sessionMessages.courseIsRequired);
  }

  if (!date) {
    date = new Date();
  }

  // Check if the session already exists
  const existingSession = await Session.findOne({ where: { courseId, date } });
  if (existingSession) {
    throw createHttpError.Conflict(sessionMessages.duplicateSessionInThisTime);
  }

  const session = await Session.create({
    courseId,
    date,
  });

  if (description) {
    session.description = description;
  }

  if (status) {
    session.status = status;
  }
  await session.save();
  return session;
}

async function update(payload) {
  let { sessionId, courseId, date, description, status } = payload;

  // Find the session
  const session = await Session.findByPk(sessionId);
  if (!session) {
    throw createHttpError.NotFound(sessionMessages.sessionNotFound);
  }

  // Update fields if provided
  if (courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw createHttpError.NotFound(sessionMessages.courseNotFound);
    }
    session.courseId = courseId;
  }

  if (date) {
    //todo Check if another session exists at the new date/time
    session.date = date;
  }

  if (description !== undefined) {
    session.description = description;
  }

  if (status !== undefined) {
    session.status = status;
  }

  await session.save();
  return session;
}
async function getById(id) {
  
  const session = await Session.findByPk(id)
    if (!session) {
    throw createHttpError.NotFound(sessionMessages.sessionNotFound);
  }
  return session
}
async function remove(id) {
  
  const session = await Session.findByPk(id)
    if (!session) {
    throw createHttpError.NotFound(sessionMessages.sessionNotFound);
  }
  await session.destroy()
  
}
module.exports = { create, update,getById,remove };

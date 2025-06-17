const createHttpError = require("http-errors");
const courseMessages = require("./session.messages");
const Session = require("./session.model");

async function create(payload) {
  let { courseId, date, description, status } = payload;

  if (!courseId) {
    throw createHttpError.BadRequest(courseMessages.courseIsRequired);
  }

  if (!date) {
    date = new Date();
  }

  // Check if the session already exists
  const existingSession = await Session.findOne({ where: { courseId, date } });
  if (existingSession) {
    throw createHttpError.Conflict(courseMessages.duplicateSessionInThisTime);
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

module.exports = { create };

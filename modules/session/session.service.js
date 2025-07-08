const createHttpError = require("http-errors");
const sessionMessages = require("./session.messages");
const Session = require("./session.model");
const Course = require("./../course/course.model");
const { USER_ROLE, SESSION_STATUS } = require("../../constants/enums");
const { Op } = require("sequelize");
const courseMessages = require("./session.messages");
const {
  normalizeDateToSeconds,
} = require("../../utils/normalizeDateToSeconds");

async function IsCourseBelongToUser({ courseId, userId, role }) {
  if (role === USER_ROLE.TEACHER) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw createHttpError.NotFound(courseMessages.courseNotFound);
    }
    if (course.teacherId !== userId) {
      throw createHttpError.NotFound(sessionMessages.notBelongToThisUser);
    }
  }
}
async function isSessionBelongToUser({ sessionId, userId, role }) {
  const session = await Session.findByPk(sessionId);
  if (!session) {
    throw createHttpError.NotFound(sessionMessages.sessionNotFound);
  }
  await IsCourseBelongToUser({ courseId: session.courseId, userId, role });
}
async function create({ payload, userId, role }) {
  let {
    courseId,
    date = new Date(),
    description,
    status = SESSION_STATUS.DRAFT,
  } = payload;

  await IsCourseBelongToUser({ courseId, userId, role });

  // check for duplicate
  date = normalizeDateToSeconds(date);

  const duplicate = await Session.findOne({
    where: {
      courseId,
      date,
    },
  });
  if (duplicate) {
    throw createHttpError.Conflict(sessionMessages.duplicateSessionInThisTime);
  }

  const session = await Session.create({
    courseId,
    date,
    description,
    status,
  });

  return session;
}

async function update({ payload, role, userId }) {
  let { sessionId, courseId, date } = payload;

  // Find the session
  const session = await Session.findByPk(sessionId);
  if (!session) {
    throw createHttpError.NotFound(sessionMessages.notFound);
  }

  // Update fields if provided
  if (courseId) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw createHttpError.NotFound(sessionMessages.courseNotFound);
    }
    session.courseId = courseId;
  }

  await IsCourseBelongToUser({ courseId: session.courseId, userId, role });

  if (payload.date || courseId) {
    let normalizedDate = normalizeDateToSeconds(payload.date || session.date);
    const duplicate = await Session.findOne({
      where: {
        courseId: session.courseId,
        date: normalizedDate,
        id: { [Op.ne]: sessionId },
      },
    });
    if (duplicate) {
      throw createHttpError.Conflict(
        sessionMessages.duplicateSessionInThisTime
      );
    }
  }

  const updatableFields = ["description", "date", "status"];
  for (const key of updatableFields) {
    if (payload.hasOwnProperty(key)) {
      session[key] = payload[key];
    }
  }

  await session.save();
  return session;
}

async function getList({ role, userId }) {
  const list = await Session.findAll({
    include: {
      model: Course,
      as: "course",
      where: { ...(role === USER_ROLE.TEACHER && { teacherId: userId }) },
    },
  });

  return list;
}

async function getById(id) {
  const session = await Session.findByPk(id);
  if (!session) {
    throw createHttpError.NotFound(sessionMessages.notFound);
  }
  return session;
}
async function remove({ id, role, userId }) {
  const session = await Session.findByPk(id);
  if (!session) {
    throw createHttpError.NotFound(sessionMessages.notFound);
  }
  await IsCourseBelongToUser({ courseId: session.id, userId, role });
  await session.destroy();
}
module.exports = {
  create,
  update,
  getById,
  remove,
  getList,
  isSessionBelongToUser,
};

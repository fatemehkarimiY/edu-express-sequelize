const createHttpError = require("http-errors");
const attendanceMessages = require("./attendance.messages");
const Attendance = require("./attendance.model");
const User = require("../user/user.model");
const Enrollment = require("../enrollment/enrollment.model");
const {
  USER_ROLE,
  ABSENCE_TYPES,
  ATTENDANCE_TYPES,
  ENROLLMENT_STATUS,
} = require("../../constants/enums");
const Session = require("../session/session.model");
const { Op } = require("sequelize");
const { isSessionBelongToUser } = require("../session/session.service");
const Course = require("../course/course.model");
const Profile = require("../profile/profile.model");

async function create({ payload, role, userId }) {
  const { sessionId, studentId, description, absenceType, attendanceType } =
    payload;

  // Check if student exists
  const student = await User.findOne({
    where: { id: studentId, role: USER_ROLE.STUDENT },
  });
  if (!student) {
    throw createHttpError.NotFound(attendanceMessages.studentNotFound);
  }
  await isSessionBelongToUser({ sessionId, role, userId });

  // Check if session exists
  const session = await Session.findByPk(sessionId);
  if (!session) {
    throw createHttpError.NotFound(attendanceMessages.sessionNotFound);
  }

  await isSessionForStudent({ student, session });

  // Check for duplicate attendance record
  const existingAttendance = await Attendance.findOne({
    where: { sessionId, studentId },
  });
  if (existingAttendance) {
    throw createHttpError.Conflict(attendanceMessages.duplicate);
  }

  // Create attendance record
  const attendanceData = {
    sessionId,
    studentId,
    description,
    attendanceType: attendanceType || ATTENDANCE_TYPES.PRESENT,
  };

  //todo delay can have type
  // Set absence type if student is marked as absent
  // if (attendanceType === ATTENDANCE_TYPES.ABSENT) {
  //   attendanceData.absenceType = absenceType || ABSENCE_TYPES.EXCUSED;
  // }

  const attendance = await Attendance.create(attendanceData);
  return attendance;
}
async function update({ payload, userId, role }) {
  const { id, sessionId, studentId } = payload;
  let session;
  let student;
  //Check if attendance exists
  const attendance = await Attendance.findByPk(id);

  await isAttendanceForTeacher({ attendance, userId, role });
  // Check if student exists
  if (studentId) {
    student = await User.findOne({
      where: { id: studentId, role: USER_ROLE.STUDENT },
    });
    if (!student) {
      throw createHttpError.NotFound(attendanceMessages.studentNotFound);
    }
  }

  // Check if session exists
  if (sessionId) {
    session = await Session.findByPk(sessionId);
    if (!session) {
      throw createHttpError.NotFound(attendanceMessages.sessionNotFound);
    }
  }

  if (sessionId || studentId) {
    await isSessionForStudent({ student, session });
    // Check for duplicate attendance record
    const existingAttendance = await Attendance.findOne({
      where: { sessionId, studentId, id: { [Op.ne]: id } },
    });
    if (existingAttendance) {
      throw createHttpError.Conflict(attendanceMessages.duplicate);
    }
  }

  const updatableKeys = ["description", "attendance_type", "absence_type"];

  for (const key of updatableKeys) {
    if (payload.hasOwnProperty(key)) {
      attendance[key] = payload[key];
    }
  }

  await attendance.save();
  return attendance;
}
async function remove({ id, role, userId }) {
  //Check if attendance exists
  const attendance = await Attendance.findByPk(id);
  await isAttendanceForTeacher({ attendance, role, userId });

  await attendance.destroy();
}

async function getList({ params, role, userId }) {
  let list;
  const { attendanceType } = params;

  if (role === USER_ROLE.STUDENT) {
    list = await Attendance.findAll({
      where: {
        studentId: userId,
        ...(attendanceType && { attendanceType }),
      },
    });
  }
  //optional
  list = await Attendance.findAll({
    where: {
      ...(attendanceType && { attendanceType }),
    },
    include: [
      {
        model: Session,
        as: "session",
        attributes: [],
        include: {
          model: Course,
          as: "course",
          where: { teacherId: userId },
          attributes: ["title"],
        },
      },
      {
        model: User,
        as: "user",
        attributes: ["mobile"],
        include: {
          model: Profile,
          as: "profile",
          attributes: ["fullname"],
        },
      },
    ],
    attributes: ["attendanceType", "description", "absenceType"],
  });

  return list;
}
async function isAttendanceForTeacher({ attendance, role, userId }) {
  if (role === USER_ROLE.TEACHER) {
    await isSessionBelongToUser({
      sessionId: attendance.sessionId,
      role,
      userId,
    });
  }
  return true;
}
async function isSessionForStudent({ session, student }) {
  const en = await Enrollment.findOne({
    where: {
      courseId: session.courseId,
      studentId: student.id,
      status: ENROLLMENT_STATUS.COMPLETED,
    },
  });
  if (!en)
    throw createHttpError.NotFound(
      attendanceMessages.studentIsNotEnrolledThisSession
    );
  return true;
}
module.exports = { create, remove, update, getList };

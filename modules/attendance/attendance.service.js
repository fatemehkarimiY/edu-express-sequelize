const createHttpError = require("http-errors");
const attendanceMessages = require("./attendance.messages");
const Attendance = require("./attendance.model");
const User = require("../user/user.model");
const {
  USER_ROLE,
  ABSENCE_TYPES,
  ATTENDANCE_TYPES,
} = require("../../constants/enums");
const Session = require("../session/session.model");

async function create(payload) {
  let { sessionId, studentId, description, absenceType, attendanceType } =
    payload;

  if (!sessionId || !studentId) {
    throw createHttpError.BadRequest(
      attendanceMessages.courseIdAndStudentIdAreRequired
    );
  }

  const student = await User.findOne({
    where: { id: studentId, role: USER_ROLE.STUDENT },
  });
  if (!student) {
    throw createHttpError.NotFound(attendanceMessages.studentNotFound);
  }
  const session = await Session.findByPk(sessionId);
  if (!session) {
    throw createHttpError.NotFound(attendanceMessages.courseNotFound);
  }

  let attendance = await Attendance.findOne({
    where: { sessionId, studentId },
  });

  if (attendance) {
    throw createHttpError.Conflict(
      attendanceMessages.attendanceExistForThisSession
    );
  }

  attendance = await Attendance.create({
    sessionId,
    studentId,
  });

  if (description) {
    attendance.description = description;
  }

  if (attendanceType) {
    attendance.attendanceType = attendanceType;
    if (attendanceType === ATTENDANCE_TYPES.ABSENT) {
      attendance.absenceType = absenceType
        ? absenceType
        : ABSENCE_TYPES.EXCUSED;
    }
  }

  attendance = await attendance.save();
  return attendance;
}

module.exports = { create };

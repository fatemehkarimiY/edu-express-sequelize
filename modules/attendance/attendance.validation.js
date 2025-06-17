const { validate, Joi } = require("express-validation");
const { ATTENDANCE_TYPES, ABSENCE_TYPES } = require("../../constants/enums");

const createAttendanceValidation = validate({
  body: Joi.object({
    sessionId: Joi.number().required(),
    studentId: Joi.number().required(),
    date: Joi.date().optional().allow(null),
    description: Joi.string().optional().allow(null),
    attendanceType: Joi.string()
      .valid(...Object.values(ATTENDANCE_TYPES))
      .required(),
    absenceType: Joi.string()
      .valid(...Object.values(ABSENCE_TYPES))
      .required(),
  }),
});

module.exports = {
  createAttendanceValidation,
};

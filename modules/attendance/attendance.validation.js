const { validate, Joi } = require("express-validation");
const { ATTENDANCE_TYPES, ABSENCE_TYPES } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createAttendanceSchema = Joi.object({
  sessionId: Joi.number().required(),
  studentId: Joi.number().required(),
  description: Joi.string().optional().allow(null),
  attendanceType: Joi.string()
    .valid(...Object.values(ATTENDANCE_TYPES))
    .required(),
  absenceType: Joi.string()
    .valid(...Object.values(ABSENCE_TYPES))
    .required(),
});
const createAttendanceValidation = validate({
  body: createAttendanceSchema,
});
const { swagger: createAttendanceSwaggerSchema } = j2s(createAttendanceSchema);

const updateAttendanceSchema = Joi.object({
  sessionId: Joi.number().optional(),
  studentId: Joi.number().optional(),
  description: Joi.string().optional().allow(null),
  attendanceType: Joi.string()
    .valid(...Object.values(ATTENDANCE_TYPES))
    .required(),
  absenceType: Joi.string()
    .valid(...Object.values(ABSENCE_TYPES))
    .required(),
});
const updateAttendanceValidation = validate({
  body: updateAttendanceSchema,
});
const { swagger: updateAttendanceSwaggerSchema } = j2s(updateAttendanceSchema);

module.exports = {
  createAttendanceValidation,
  updateAttendanceValidation,
  createAttendanceSwaggerSchema,
  updateAttendanceSwaggerSchema,
};

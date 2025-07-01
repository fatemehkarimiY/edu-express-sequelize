const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createEnrollmentSchema = Joi.object({
  // studentId: Joi.number().optional(),
  courseId: Joi.number().required(),
  date: Joi.date().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(ENROLLMENT_STATUS))
    .optional(),
});
const createEnrollmentValidation = validate({
  body: createEnrollmentSchema,
});
const getEnrollmentSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(ENROLLMENT_STATUS))
    .optional(),
});
const getEnrollmentValidation = validate({
  body: getEnrollmentSchema,
});
const { swagger: createEnrollmentSwaggerSchema } = j2s(createEnrollmentSchema);
const { swagger: getEnrollmentSwaggerSchema } = j2s(getEnrollmentSchema);

module.exports = {
  createEnrollmentValidation,
  createEnrollmentSwaggerSchema,
  getEnrollmentValidation,
  getEnrollmentSwaggerSchema,
};

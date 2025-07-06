const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createEnrollmentSchema = Joi.object({
  courseId: Joi.number().required(),
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
  query: getEnrollmentSchema,
});
const { swagger: getEnrollmentSwaggerSchema } = j2s(getEnrollmentSchema);
const { swagger: createEnrollmentSwaggerSchema } = j2s(createEnrollmentSchema);

module.exports = {
  createEnrollmentValidation,
  createEnrollmentSwaggerSchema,
  getEnrollmentValidation,
  getEnrollmentSwaggerSchema,
};

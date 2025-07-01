const { validate, Joi } = require("express-validation");
const { SESSION_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createSessionSchema = Joi.object({
  courseId: Joi.number().required(),
  date: Joi.date().optional().allow(null),
  description: Joi.string().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(SESSION_STATUS))
    .required(),
});
const updateSessionSchema = Joi.object({
  courseId: Joi.number().optional(),
  date: Joi.date().optional().allow(null),
  description: Joi.string().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(SESSION_STATUS))
    .optional(),
});

const createSessionValidation = validate({
  body: createSessionSchema,
});

const updateSessionValidation = validate({
  body: updateSessionSchema,
});

const { swagger: createSessionSwaggerSchema } = j2s(createSessionSchema);
const { swagger: updateSessionSwaggerSchema } = j2s(updateSessionSchema);

module.exports = {
  createSessionValidation,
  createSessionSwaggerSchema,
  updateSessionValidation,
  updateSessionSwaggerSchema,
};

const { validate, Joi } = require("express-validation");
const { USER_ROLE } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const assignRoleSchema = Joi.object({
  userId: Joi.number().required(),
  role: Joi.string()
    .valid(...Object.values(USER_ROLE))
    .required()
    .example(USER_ROLE.USER),
});

const assignRoleValidation = validate({
  body: assignRoleSchema,
});

const { swagger: assignRoleSwaggerSchema } = j2s(assignRoleSchema);

module.exports = {
  assignRoleValidation,
  assignRoleSwaggerSchema,
};

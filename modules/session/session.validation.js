const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS, SESSION_STATUS } = require("../../constants/enums");

const createSessionValidation = validate({
  body: Joi.object({
    courseId: Joi.number().required(),
    date: Joi.date().optional().allow(null),
    description: Joi.string().optional().allow(null),
    status: Joi.string()
      .valid(...Object.values(SESSION_STATUS))
      .required(),
  }),
});

module.exports = {
  createSessionValidation,
};

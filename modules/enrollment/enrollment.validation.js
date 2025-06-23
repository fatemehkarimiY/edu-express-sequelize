const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS } = require("../../constants/enums");

const createEnrollmentValidation = validate({
  body: Joi.object({
    // studentId: Joi.number().optional(),
    courseId: Joi.number().required(),
    date: Joi.date().optional().allow(null),
    status: Joi.string()
      .valid(...Object.values(ENROLLMENT_STATUS))
      .optional(),
  }),
});

module.exports = {
  createEnrollmentValidation,
};

const { validate, Joi } = require("express-validation");
const { COURSE_STATUS } = require("../../constants/enums");

const createCourseValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    teacherId: Joi.number().required(),
    description: Joi.string().required(),
    price: Joi.number().optional().allow(null),
    capacity: Joi.number().optional().allow(null),
    status: Joi.string()
      .valid(...Object.values(COURSE_STATUS))
      .required(),
  }),
});

module.exports = {
  createCourseValidation,
};

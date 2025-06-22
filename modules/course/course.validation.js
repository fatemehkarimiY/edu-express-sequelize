const { validate, Joi } = require("express-validation");
const { COURSE_STATUS } = require("../../constants/enums");

const createCourseValidation = validate({
  body: Joi.object({
    //todo check trim " "
    title: Joi.string().required(),
    teacherId: Joi.number().required(),
    description: Joi.string().optional().allow(null),
    price: Joi.number().optional().allow(null),
    capacity: Joi.number().optional().allow(null),
    status: Joi.string()
      .valid(...Object.values(COURSE_STATUS))
      .optional(),
  }),
});
const updateCourseValidation = validate({
  body: Joi.object({
    title: Joi.string().optional(),
    teacherId: Joi.number().optional(),
    description: Joi.string().optional().allow(null),
    price: Joi.number().optional().allow(null),
    capacity: Joi.number().optional().allow(null),
    status: Joi.string()
      .valid(...Object.values(COURSE_STATUS))
      .optional(),
  }),
});

module.exports = {
  createCourseValidation,
  updateCourseValidation,
};

const { validate, Joi } = require("express-validation");
const { COURSE_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createCourseSchema = Joi.object({
  //todo check trim " "
  title: Joi.string().required(),
  teacherId: Joi.number().required(),
  description: Joi.string().optional().allow(null),
  price: Joi.number().optional().allow(null),
  capacity: Joi.number().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(COURSE_STATUS))
    .optional()
    .example(COURSE_STATUS.DRAFT),
});
const createCourseValidation = validate({
  body: createCourseSchema,
});
const updateCourseSchema = Joi.object({
  title: Joi.string().optional(),
  teacherId: Joi.number().optional(),
  description: Joi.string().optional().allow(null),
  price: Joi.number().optional().allow(null),
  capacity: Joi.number().optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(COURSE_STATUS))
    .optional(),
});
const updateCourseValidation = validate({
  body: updateCourseSchema,
});
const { swagger: createCourseSwaggerSchema } = j2s(createCourseSchema);
const { swagger: updateCourseSwaggerSchema } = j2s(updateCourseSchema);
module.exports = {
  createCourseValidation,
  updateCourseValidation,
  createCourseSwaggerSchema,
  updateCourseSwaggerSchema,
};

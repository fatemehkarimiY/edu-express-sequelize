const { validate, Joi } = require("express-validation");
const { COURSE_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const createCourseSchema = Joi.object({
  title: Joi.string().trim().required(),
  teacherId: Joi.number(), //validate in code
  description: Joi.string().optional().allow(null),
  price: Joi.number().positive().optional().allow(null),
  payablePrice: Joi.number().positive().optional().allow(null),
  capacity: Joi.number().integer().min(0).optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(COURSE_STATUS))
    .optional()
    .example(COURSE_STATUS.DRAFT),
}).custom((value, helpers) => {
  const { payablePrice, price } = value;

  if (price && payablePrice && payablePrice > price) {
    return helpers.message(
      '"payablePrice" must be less than or equal to "price"'
    );
  }

  return value;
});
const createCourseValidation = validate({
  body: createCourseSchema,
});
const { swagger: createCourseSwaggerSchema } = j2s(createCourseSchema);

// #region update
const updateCourseSchema = Joi.object({
  title: Joi.string().trim().optional(),
  teacherId: Joi.number().optional(), //get in course/:id
  description: Joi.string().optional().allow(null),
  price: Joi.number().positive().optional().allow(null),
  payablePrice: Joi.number().positive().optional().allow(null),
  capacity: Joi.number().integer().min(0).optional().allow(null),
  status: Joi.string()
    .valid(...Object.values(COURSE_STATUS))
    .optional(),
}).custom((value, helpers) => {
  const { price, payablePrice } = value;
  if (price && payablePrice && price < payablePrice) {
    return helpers.message(
      '"payablePrice" must be less than or equal to "price"'
    );
  }
  return true;
});
const updateCourseValidation = validate({
  body: updateCourseSchema,
});
const { swagger: updateCourseSwaggerSchema } = j2s(updateCourseSchema);
// #endregion update

module.exports = {
  createCourseValidation,
  updateCourseValidation,
  createCourseSwaggerSchema,
  updateCourseSwaggerSchema,
};

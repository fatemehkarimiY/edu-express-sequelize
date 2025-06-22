const { validate, Joi } = require("express-validation");

const addCartItemValidation = validate({
  body: Joi.object({
    courseId: Joi.number().required(),
    totalAmount: Joi.number().optional(),
    finalAmount: Joi.number().optional(),
    discountAmount: Joi.number().optional(),
  }),
});

module.exports = {
  addCartItemValidation,
};

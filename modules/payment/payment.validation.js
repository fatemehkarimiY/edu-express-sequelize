const { validate, Joi } = require("express-validation");
const j2s = require("joi-to-swagger");

const verifyPaymentSchema = Joi.object({
  Authority: Joi.string().required(),
  Status: Joi.string().required(),
});

const verifyPaymentValidation = validate({
  body: verifyPaymentSchema,
});

const { swagger: verifyPaymentSwaggerSchema } = j2s(verifyPaymentSchema);

module.exports = {
  verifyPaymentValidation,
  verifyPaymentSwaggerSchema,
};

const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS, SESSION_STATUS } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const sendOtpSchema = Joi.object({
  mobile: Joi.string().required().example("09135244743"),
});
const sendOtpValidation = validate({
  body: sendOtpSchema,
});

const verifyOtpSchema = Joi.object({
  mobile: Joi.string().required().example("09135244743"),
  code: Joi.string().required(),
});
const verifyOtpValidation = validate({
  body: verifyOtpSchema,
});

const { swagger: sendOtpSwaggerSchema } = j2s(sendOtpSchema);
const { swagger: verifyOtpSwaggerSchema } = j2s(verifyOtpSchema);

module.exports = {
  sendOtpValidation,
  verifyOtpValidation,
  sendOtpSwaggerSchema,
  verifyOtpSwaggerSchema,
};

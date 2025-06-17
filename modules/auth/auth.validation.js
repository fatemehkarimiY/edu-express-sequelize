const { validate, Joi } = require("express-validation");
const { ENROLLMENT_STATUS, SESSION_STATUS } = require("../../constants/enums");

const sendOtpValidation = validate({
  body: Joi.object({
    mobile: Joi.number().required(),
  }),
});
const verifyOtpValidation = validate({
  body: Joi.object({
    mobile: Joi.number().required(),
    code: Joi.string().required(),
  }),
});

module.exports = {
  sendOtpValidation,
  verifyOtpValidation,
};

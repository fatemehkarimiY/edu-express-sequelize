const { validate, Joi } = require("express-validation");
const { GENDER_ENUM } = require("../../constants/enums");
const j2s = require("joi-to-swagger");

const updateProfileSchema = Joi.object({
  fullname: Joi.string().required(),
  bio: Joi.string(),
  birthDate: Joi.date(),
  latitude: Joi.string(),
  password: Joi.string(),
  longitude: Joi.string(),
  gender: Joi.string()
    .valid(...Object.values(GENDER_ENUM))
    .optional(),
});
const updateProfileValidation = validate({
  body: updateProfileSchema,
});
const { swagger: updateProfileSwaggerSchema } = j2s(updateProfileSchema);

module.exports = {
  updateProfileValidation,
  updateProfileSwaggerSchema,
};

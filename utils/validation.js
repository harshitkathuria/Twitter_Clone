const Joi = require("joi");

exports.signUpUserValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    DOB: Joi.date().required(),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.ref("password")
  }).options({ abortEarly: false });
  return schema.validate(data);
};

exports.loginUserValidation = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).options({ abortEarly: false });
  return schema.validate(data);
};

const Joi = require("joi");

const userSchema = Joi.object({
  user_name: Joi.string(),
  user_email: Joi.string().email(),
  user_password: Joi.string().min(6).max(20),
  user_info: Joi.string().min(5),
  user_photo: Joi.string(),
  // user_token: Joi.string().default(""),
});

module.exports = userSchema;

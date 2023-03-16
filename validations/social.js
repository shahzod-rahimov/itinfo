const Joi = require("joi");

const socialSchema = Joi.object({
  social_name: Joi.string(),
  social_icon_file: Joi.string(),
});

module.exports = socialSchema;

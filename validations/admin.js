const Joi = require("joi");

exports.AdminValidation = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string(),
    admin_email: Joi.string().email(),
    admin_password: Joi.string().min(6).max(20),
    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.boolean().default(false),
    // admin_token: Joi.string().default(""),
  });
  return schema.validate(data);
};

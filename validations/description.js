const Joi = require("joi");

const DescriptionSchema = Joi.object({
  dict_id: Joi.string().alphanum().length(24),
  category_id: Joi.string().alphanum().length(24),
  description: Joi.string(),
});

module.exports = DescriptionSchema
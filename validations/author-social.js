const Joi = require("joi");

const authorSoialSchema = Joi.object({
  author_id: Joi.string().alphanum().length(24),
  social_id: Joi.string().alphanum().length(24),
  social_link: Joi.string(),
});

module.exports = authorSoialSchema;

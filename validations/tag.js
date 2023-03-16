const Joi = require("joi");

const tagSchema = Joi.object({
  topic_id: Joi.string().alphanum().length(24),
  category_id: Joi.string().alphanum().length(24),
});

module.exports = tagSchema;

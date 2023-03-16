const Joi = require("joi");

const descQASchema = Joi.object({
  qa_id: Joi.string().alphanum().length(24),
  desc_id: Joi.string().alphanum().length(24),
});

module.exports = descQASchema;

const Joi = require("joi");

const QASchema = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
  created_date: Joi.date(),
  updated_date: Joi.date(),
  is_checked: Joi.boolean().default(false),
  expert_id: Joi.string().alphanum().length(24),
});

module.exports = QASchema;

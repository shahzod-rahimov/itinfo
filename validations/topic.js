const Joi = require("joi");

const topicSchema = Joi.object({
  author_id: Joi.string().alphanum().length(24),
  topic_title: Joi.string().min(2).max(50),
  topic_text: Joi.string(),
  topic_photo: Joi.string(),
  created_date: Joi.date(),
  updated_date: Joi.date(),
  is_checked: Joi.boolean().default(false),
  is_approwed: Joi.boolean().default(false),
  expert_id: Joi.string().alphanum().length(24),
});

module.exports = topicSchema;

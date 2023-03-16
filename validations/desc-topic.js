const Joi = require("joi");

const descTopicSchema = Joi.object({
  desc_id: Joi.string().alphanum().length(24),
  topic_id: Joi.string().alphanum().length(24),
});

module.exports = descTopicSchema;
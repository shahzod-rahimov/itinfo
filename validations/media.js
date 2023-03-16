const Joi = require("joi");

const MediaSchema = Joi.object({
  media_name: Joi.string(),
  media_file: Joi.string(),
  target_table_name: Joi.string(),
  target_table_id: Joi.string().alphanum().length(24),
});

module.exports = MediaSchema;

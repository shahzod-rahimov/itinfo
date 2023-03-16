const Joi = require("joi");

const synonymSchema = Joi.object({
  desc_id: Joi.string().alphanum().length(24),
  dict_id: Joi.string().alphanum().length(24),
});

module.exports = synonymSchema;

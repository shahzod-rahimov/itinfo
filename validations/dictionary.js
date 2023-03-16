const Joi = require("joi");

const DictionarySchema = Joi.object({
  term: Joi.string().min(2).trim(),
});

module.exports = DictionarySchema;

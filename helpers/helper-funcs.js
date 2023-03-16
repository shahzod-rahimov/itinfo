const Joi = require("joi");
// const path = require('path');
// const { isValidObjectId } = require("mongoose");

const errorHandler = (res, error) => {
  res.error(400, { friendlyMsg: `Error ${error}` });
};

const emailValidation = (email) => {
  const check = Joi.string().email().validate(email);
  return check.error ? false : true;
};
const path = require("path");

const createViewPath = (page) =>
  path.resolve(__dirname, "../views", `${page}.hbs`);

// const isValidID = (res, id) => {
//   if (!isValidObjectId(id))
//     return res.error(400,{ friendlyMsg: "Invalid id" });
// };
// const isExists = (res, data) => {
//   if (!data) return res.error(400,{ friendlyMsg: "Not Found" });
// };

module.exports = { errorHandler, emailValidation, createViewPath };

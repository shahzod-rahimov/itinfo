const { Schema, model } = require("mongoose");

const authorSchem = new Schema(
  {
    author_first_name: { type: String },
    author_last_name: { type: String },
    author_nick_name: { type: String, unique: true },
    author_email: { type: String, unique: true },
    author_phone: { type: String },
    author_password: { type: String },
    author_info: { type: String },
    author_position: { type: String },
    author_photo: { type: String },
    is_export: { type: Boolean },
    author_token: { type: String },
    author_is_active: { type: Boolean, default: false },
    author_activation_link: { type: String },
  },
  { versionKey: false }
);

module.exports = model("author", authorSchem);

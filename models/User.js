const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    user_name: { type: String },
    user_email: { type: String, unique: true },
    user_password: { type: String },
    user_info: { type: String },
    user_photo: { type: String }, 
    user_is_active: { type: Boolean, default: false },
    user_activation_link: { type: String, },
    user_token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("user", UserSchema);

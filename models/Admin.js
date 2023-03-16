const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    admin_name: { type: String },
    admin_email: { type: String, unique: true },
    admin_password: { type: String },
    admin_is_active: { type: Boolean },
    admin_is_creator: { type: Boolean },
    admin_token: { type: String },
    admin_activation_link: { type: String },
    admin_is_activated: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("admin", AdminSchema);

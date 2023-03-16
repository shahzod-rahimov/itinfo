const { Schema, model } = require("mongoose");

const mediaSchema = new Schema(
  {
    media_name: { type: String },
    media_file: { type: String },
    target_table_name: { type: String },
    target_table_id: { type: Schema.Types.ObjectId },
  },
  { versionKey: false }
);

module.exports = model("media", mediaSchema);

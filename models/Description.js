const { Schema, model } = require("mongoose");

const discriptionSchema = new Schema(
  {
    dict_id: { type: Schema.Types.ObjectId, ref: "dictionaries" },
    category_id: { type: Schema.Types.ObjectId, ref: "category" },
    description: { type: String, trim: true },
  },
  { versionKey: false }
);

module.exports = model("Descriptions", discriptionSchema);

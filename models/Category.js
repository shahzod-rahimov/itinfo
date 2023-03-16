const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    category_name: { type: String, trim: true },
    parent_category_id: { type: Schema.Types.ObjectId, ref: "category" },
  },
  { versionKey: false }
);

module.exports = model("categories", CategorySchema);

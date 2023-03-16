const { Schema, model } = require("mongoose");

const synonymSchema = new Schema(
  {
    desc_id: { type: Schema.Types.ObjectId, ref: "descriptions" },
    dict_id: { type: Schema.Types.ObjectId, ref: "dictionaries" },
  },
  { versionKey: false }
);

module.exports = model("synonym", synonymSchema);

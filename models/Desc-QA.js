const { Schema, model } = require("mongoose");

const descQASchema = new Schema(
  {
    qa_id: { type: Schema.Types.ObjectId, ref: "question-answer" },
    desc_id: { type: Schema.Types.ObjectId, ref: "Descriptions" },
  },
  { versionKey: false }
);

module.exports = model("desc-QA", descQASchema);

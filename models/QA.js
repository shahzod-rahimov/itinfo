const { Schema, model } = require("mongoose");

const QASchema = new Schema(
  {
    question: { type: String },
    answer: { type: String },
    created_date: { type: Date },
    updated_date: { type: Date },
    is_checked: { type: Boolean },
    expert_id: { type: Schema.Types.ObjectId, ref: "author" },
  },
  { versionKey: false }
);

module.exports = model("question-answer", QASchema);

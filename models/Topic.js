const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, red: "author" },
  topic_title: { type: String },
  topic_text: { type: String },
  topic_photo: {type: String},
  created_date: { type: Date },
  updated_date: { type: Date },
  is_checked: { type: Boolean },
  is_approwed: { type: Boolean },
  expert_id: { type: Schema.Types.ObjectId, red: "author" },
}, {versionKey: false});

module.exports = model("topic", topicSchema);

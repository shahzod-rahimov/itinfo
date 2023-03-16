const { Schema, model } = require("mongoose");

const descTopicSchema = new Schema(
  {
    desc_id: { type: Schema.Types.ObjectId, ref: "descriptions" },
    topic_id: { type: Schema.Types.ObjectId, ref: "topic" },
  },
  { versionKey: false }
);

module.exports = model("desc-topic", descTopicSchema);

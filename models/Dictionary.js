const { Schema, model } = require("mongoose");

const dictionarySchema = new Schema(
  {
    term: { type: String, trim: true, unique: true },
    letter: { type: String, uppercase: true },
  },
  { versionKey: false }
);

dictionarySchema.pre("save", function (next) {
  this.letter = this.get("term")[0];
  next();
});

module.exports = model("Dictionaries", dictionarySchema);

const admin = require("./admin.validator");
const user = require("./user.validator");
const email_pass = require("./email_pass.validator");
const author = require("./author.validator");
const authorSocial = require("./author-social");
const category = require("./category");
const descQA = require("./desc-qa");
const descTopic = require("./desc-topic");
const description = require("./description");
const dictionary = require("./dictionary");
const media = require("./media");
const qa = require("./qa");
const social = require("./social");
const synonym = require("./synonym");
const tag = require("./tag");
const topic = require("./topic");

module.exports = {
  admin,
  user,
  email_pass,
  author,
  authorSocial,
  category,
  descQA,
  descTopic,
  description,
  dictionary,
  media,
  qa,
  social,
  synonym,
  tag,
  topic,
};

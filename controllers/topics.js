const Topic = require("../models/Topic");
const Author = require("../models/Author");
const { createViewPath } = require("../helpers/helper-funcs");

const getTopics = async (req, res) => {
  let data = [];
  const topics = await Topic.find({});
  topics.forEach((el) => {
    data.push({
      id: el._id,
      title: el.topic_title,
      img: el.topic_photo,
    });
  });
  res.render(createViewPath("topics"), {
    title: "Maqolalar",
    isTopic: true,
    data,
  });
};

const getTopicByID = async (req, res) => {
  try {
    const id = req.params.id;
    const topic = await Topic.findById(id);
    const author = await Author.findById(topic.author_id);

    let data = {
      author: author.author_first_name + " " + author.author_last_name,
      author_id: topic.author_id,
      title: topic.topic_title,
      text: topic.topic_text,
      img: topic.topic_photo,
      date: topic.created_date.toDateString(),
      is_checked: topic.is_checked,
      expert: "",
      expert_id: "",
    };

    if (!topic.author_id.equals(topic.expert_id)) {
      const expert = await Author.findById(topic.expert_id);
      data.expert = expert.author_first_name + " " + expert.author_last_name;
      data.expert_id = expert._id;
    }

    res.render(createViewPath("topic"), {
      title: data.title,
      isTopic: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getTopics, getTopicByID };

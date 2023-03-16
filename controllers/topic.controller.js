const { isValidObjectId } = require("mongoose");
const Topic = require("../models/Topic");
const { TopicValidation } = require("../validations/topic");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({});
    if (!topics.length)
      return res.error(400, { friendlyMsg: "Tpoics not found" });

    res.ok(200, topics);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getTopicById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const topic = await Topic.findById({ _id: id });
    if (!topic) return res.error(400, { friendlyMsg: "Topic not found!" });
    res.ok(200, topic);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addTopic = async (req, res) => {
  try {
    await Topic(req.body).save();
    res.ok(200, { message: "Tpoic added" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editTopic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const topic = await Topic.findByIdAndUpdate(id, req.body);
    if (!topic) return res.error(400, { friendlyMsg: "Topic not found" });

    res.ok(200, "Topic edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const topic = await Topic.findOneAndRemove({ _id: id });
    if (!topic) return res.error(400, { friendlyMsg: "Topic not found" });
    res.ok(200, "Topic deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = { getTopics, getTopicById, addTopic, editTopic, deleteTopic };

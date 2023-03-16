const DescTopic = require("../models/Tag");
const { DescTopicValidation } = require("../validations/desc-topic");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getDescTopics = async (req, res) => {
  try {
    const dts = await DescTopic.find({});
    if (!dts.length)
      return res.error(400, { friendlyMsg: "Desc-Topics not found" });

    res.ok(200, dts);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getDescTopicById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dt = await DescTopic.findById(id);
    if (!dt) return res.error(400, { friendlyMsg: "Desc-Topic not found!" });
    res.ok(200, dt);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addDescTopic = async (req, res) => {
  try {
    await DescTopic(req.body).save();
    res.ok(200, "Desc-Topic added successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editDescTopic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dt = await DescTopic.findByIdAndUpdate(id, req.body);
    if (!dt) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "Desc-Topic edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteDescTopic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dt = await DescTopic.findOneAndRemove({ _id: id });
    if (!dt) return res.error(400, { friendlyMsg: "Desc-Topic not found" });
    res.ok(200, "Desc-Topic deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getDescTopics,
  getDescTopicById,
  addDescTopic,
  editDescTopic,
  deleteDescTopic,
};

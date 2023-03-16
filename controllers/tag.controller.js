const { isValidObjectId } = require("mongoose");
const Tag = require("../models/Tag");
const { TagValidation } = require("../validations/tag");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    if (!tags.length) return res.error(400, { friendlyMsg: "Tags not found" });

    res.ok(200, tags);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getTagById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const tag = await Tag.findById({ _id: id });
    if (!tag) return res.error(400, { friendlyMsg: "Tag not found!" });
    res.ok(200, tag);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addTag = async (req, res) => {
  try {
    await Tag(req.body).save();
    res.ok(200, "Tag added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editTag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const tag = await Tag.findByIdAndUpdate(id, req.body);
    if (!tag) return res.error(400, { friendlyMsg: "Tag not found" });

    res.ok(200, "Tag edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const tag = await Tag.findOneAndRemove({ _id: id });
    if (!tag) return res.error(400, { friendlyMsg: "Tag not found" });
    res.ok(200, "Tag deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getTags,
  getTagById,
  addTag,
  editTag,
  deleteTag,
};

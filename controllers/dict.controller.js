const { isValidObjectId } = require("mongoose");
const Dictionary = require("../models/Dictionary");
const { DictionaryValidation } = require("../validations/dictionary");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getDicts = async (req, res) => {
  try {
    const dicts = await Dictionary.find({});
    if (!dicts)
      return res.error(400, { friendlyMsg: "Dictionary n  ot found" });

    res.ok(200, dicts);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addDict = async (req, res) => {
  try {
    await Dictionary(req.body).save();
    res.ok(200, "Dictionary added successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editDict = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dict = await Dictionary.findByIdAndUpdate(id, req.body);
    if (!dict) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "Dictionary edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteDict = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const removeDict = await Dictionary.findOneAndRemove({ _id: id });
    if (!removeDict)
      return res.error(400, { friendlyMsg: "Dictionary not found" });

    res.ok(200, "Dictionary deleted successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getDictById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dict = await Dictionary.findById({ _id: id });
    if (!dict) return res.error(400, { friendlyMsg: "Dictionary not found!" });
    res.ok(200, dict);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getDicts,
  addDict,
  editDict,
  deleteDict,
  getDictById,
};

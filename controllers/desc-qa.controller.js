const { isValidObjectId } = require("mongoose");
const DescQA = require("../models/Desc-QA");
const { descriptionQAValidation } = require("../validations/desc-qa");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getDescQAs = async (req, res) => {
  try {
    const dqas = await DescQA.find({});
    if (!dqas.length)
      return res.error(400, { friendlyMsg: "DescQAs not found" });

    res.ok(200, dqas);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getDescQAById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dqa = await DescQA.findById(id);
    if (!dqa) return res.error(400, { friendlyMsg: "Not Found!" });
    res.ok(200, dqa);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addDescQA = async (req, res) => {
  try {
    await DescQA(req.body).save();
    res.ok(200, "DescQA added successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editDescQA = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dqa = await DescQA.findByIdAndUpdate(id, req.body);
    if (!dqa) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "DescQA edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteDescQA = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const dqa = await DescQA.findByIdAndRemove(id);
    if (!dqa) return res.error(400, { friendlyMsg: "Not Found" });
    res.ok(200, "DescQA deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getDescQAs,
  getDescQAById,
  addDescQA,
  editDescQA,
  deleteDescQA,
};

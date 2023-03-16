const { isValidObjectId } = require("mongoose");
const QA = require("../models/QA");
const { QAValidation } = require("../validations/qa");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getQAs = async (req, res) => {
  try {
    const qas = await QA.find({});
    if (!qas.length)
      return res.error(400, { friendlyMsg: "Question-Answers not found" });

    res.ok(200, qas);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getQAById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const qa = await QA.findById({ _id: id });
    if (!qa)
      return res.error(400, { friendlyMsg: "Question-Answer not found!" });
    res.ok(200, qa);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addQA = async (req, res) => {
  try {
    await QA(req.body).save();
    res.ok(200, { message: "Question-Answer added" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editQA = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const qa = await QA.findByIdAndUpdate(id, req.body);
    if (!qa)
      return res.error(400, { friendlyMsg: "Question-Answer not found" });

    res.ok(200, "Question-Answer edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteQA = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const qa = await QA.findOneAndRemove({ _id: id });
    if (!qa)
      return res.error(400, { friendlyMsg: "Question-Answer not found" });
    res.ok(200, "Question-Answer deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getQAs,
  getQAById,
  addQA,
  editQA,
  deleteQA,
};

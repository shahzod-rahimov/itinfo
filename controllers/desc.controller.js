const { isValidObjectId } = require("mongoose");
const Description = require("../models/Description");
const { DescriptionValidation } = require("../validations/description");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getDescs = async (req, res) => {
  try {
    const descs = await Description.find({});

    if (!descs.length)
      return res.error(400, { friendlyMsg: "Descriptons not found" });

    res.ok(200, descs);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addDesc = async (req, res) => {
  try {
    await Description(req.body).save();
    res.ok(200, "Description added successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editDesc = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const desc = await Description.findByIdAndUpdate(id, req.body);
    if (!desc) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "Description edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteDesc = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const desc = await Description.findOneAndRemove({ _id: id });
    if (!desc) return res.error(400, { friendlyMsg: "Descriptons not found" });
    res.ok(200, "Description deleted successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getDescById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const desc = await Description.findById({ _id: id });
    if (!desc) return res.error(400, { friendlyMsg: "Description not found!" });
    res.ok(200, desc);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = { getDescs, addDesc, editDesc, deleteDesc, getDescById };

const { isValidObjectId } = require("mongoose");
const Category = require("../models/Category");
const ApiError = require("../errors/ApiError");
const { categoryValidation } = require("../validations/category");
// const { errorHandler } = require("../helpers/helper-funcs");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories.length)
      return res.error(400, { friendlyMsg: "Categories not found" });

    res.ok(200, categories);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    await Category(req.body).save();

    res.ok(200, "Category added successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const category = await Category.findByIdAndUpdate(id, req.body);
    if (!category) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "Category edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({ _id: req.params.id });
    if (!category) return res.error(400, { friendlyMsg: "Category not found" });
    res.ok(200, "Category deleted successfully");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    if (!category)
      return res.error(400, { friendlyMsg: "Category not found!" });
    res.ok(200, category);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
};

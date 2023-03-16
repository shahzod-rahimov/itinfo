const AuthorSocial = require("../models/Author_Social");
const { authorSocialValidate } = require("../validations/author-social");
const { isValidObjectId } = require("mongoose");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getAuthorSocials = async (req, res) => {
  try {
    const authorSocials = await AuthorSocial.find({});
    if (!authorSocials.length)
      return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, authorSocials);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getAuthorSocialById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const authorSocial = await AuthorSocial.findById(id);
    if (!authorSocial) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, authorSocial);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addAuthorSocial = async (req, res) => {
  try {
    await AuthorSocial(req.body).save();
    res.ok(200, "Author's social added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editAuthorSocial = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const authorSocial = await AuthorSocial.findByIdAndUpdate(id, req.body);
    if (!authorSocial) return res.error(400, { friendlyMsg: "Not Found" });

    res.status(200).send({ message: "Author's social edited" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteAuthorSocial = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const authorSocial = await AuthorSocial.findOneAndRemove(id);
    if (!authorSocial) return res.status(404).send({ message: "Not Found" });

    res.ok(200, "Author's social deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getAuthorSocials,
  getAuthorSocialById,
  addAuthorSocial,
  editAuthorSocial,
  deleteAuthorSocial,
};

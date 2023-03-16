const { isValidObjectId } = require("mongoose");
const Social = require("../models/Social");
const { SocialValidation } = require("../validations/social");
const ApiError = require("../errors/ApiError");
// const { errorHandler } = require("../helpers/helper-funcs");

const getSocials = async (req, res) => {
  try {
    const socials = await Social.find({});
    if (!socials.length)
      return res.error(400, { friendlyMsg: "Socials not found" });

    res.ok(200, socials);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getSocialById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const social = await Social.findById({ _id: id });
    if (!social) return res.error(400, { friendlyMsg: "Social not found!" });
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addSocial = async (req, res) => {
  try {
    await Social(req.body).save();
    res.ok(200, "Social added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editSocial = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const social = await Social.findByIdAndUpdate(id, req.body);
    if (!social) return res.error(400, { friendlyMsg: "Social not found" });

    res.ok(200, "Social edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteSocial = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const social = await Social.findOneAndRemove({ _id: id });
    if (!social) return res.error(400, { friendlyMsg: "Social not found" });
    res.ok(200, "Social deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getSocials,
  getSocialById,
  addSocial,
  editSocial,
  deleteSocial,
};

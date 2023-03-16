const { isValidObjectId } = require("mongoose");
const Media = require("../models/Media");
const { MediaValidation } = require("../validations/media");
// const { errorHandler } = require("../helpers/helper-funcs");
const ApiError = require("../errors/ApiError");

const getMedias = async (req, res) => {
  try {
    const medias = await Media.find({});
    if (!medias.length)
      return res.error(400, { friendlyMsg: "Medias not found" });

    res.ok(200, medias);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const media = await Media.findById({ _id: id });
    if (!media) return res.error(400, { friendlyMsg: "Media not found!" });
    res.ok(200, media);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addMedia = async (req, res) => {
  try {
    await Media(req.body).save();
    res.ok(200, "Media added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editMedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const media = await Media.findByIdAndUpdate(id, req.body);
    if (!media) return res.error(400, { friendlyMsg: "Media not found" });
    res.ok(200, "Media edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const media = await Media.findOneAndRemove({ _id: id });
    if (!media) return res.error(400, { friendlyMsg: "Media not found" });
    res.ok(200, "Media deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getMedias,
  getMediaById,
  addMedia,
  editMedia,
  deleteMedia,
};

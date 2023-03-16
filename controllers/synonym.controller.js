const { isValidObjectId } = require("mongoose");
const Synonym = require("../models/Synonym");
const { errorHandler } = require("../helpers/helper-funcs");
const ApiError = require("../errors/ApiError");
// const { SynonymValidation } = require("../validations/synonym");

const getSynonyms = async (req, res) => {
  try {
    const synonyms = await Synonym.find({});
    if (!synonyms.length)
      return res.error(400, { friendlyMsg: "Synonyms not found" });

    res.ok(200, synonyms);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getSynonymById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const synonym = await Synonym.findById({ _id: id });
    if (!synonym) return res.error(400, { friendlyMsg: "Synonym not found!" });
    res.ok(200, synonym);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addSynonym = async (req, res) => {
  try {
    await Synonym(req.body).save();
    res.ok(200, "Synonym added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editSynonym = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const synonym = await Synonym.findByIdAndUpdate(id);
    if (!synonym) return res.error(400, { friendlyMsg: "Synonym not found" });

    res.ok(200, "Synonym edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const synonym = await Synonym.findOneAndRemove({ _id: id });
    if (!synonym) return res.error(400, { friendlyMsg: "Synonym not found" });
    res.ok(200, "Synonym deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getSynonyms,
  getSynonymById,
  addSynonym,
  editSynonym,
  deleteSynonym,
};

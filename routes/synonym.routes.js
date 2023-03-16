const { Router } = require("express");
const {
  getSynonyms,
  addSynonym,
  getSynonymById,
  editSynonym,
  deleteSynonym,
} = require("../controllers/synonym.controller");

const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getSynonyms);
router.post("/", Validator("synonym"), addSynonym);
router.get("/:id", getSynonymById);
router.put("/:id", Validator("synonym"), editSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;

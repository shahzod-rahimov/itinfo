const { Router } = require("express");
const {
  getDescQAs,
  addDescQA,
  getDescQAById,
  editDescQA,
  deleteDescQA,
} = require("../controllers/desc-qa.controller");
const Validator = require("../middleware/validator");

const router = Router();

router.get("/", getDescQAs);
router.post("/", Validator("descQA"), addDescQA);
router.get("/:id", getDescQAById);
router.put("/:id", Validator("descQA"), editDescQA);
router.delete("/:id", deleteDescQA);

module.exports = router;

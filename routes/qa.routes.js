const { Router } = require("express");
const {
  getQAs,
  getQAById,
  addQA,
  editQA,
  deleteQA,
} = require("../controllers/qa.controller");

const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getQAs);
router.post("/", Validator("qa"), addQA);
router.get("/:id", getQAById);
router.put("/:id", Validator("qa"), editQA);
router.delete("/:id", deleteQA);

module.exports = router;

const { Router } = require("express");
const {
  getDicts,
  addDict,
  editDict,
  deleteDict,
  getDictById,
} = require("../controllers/dict.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getDicts);
router.post("/", Validator("dictionary"), addDict);
router.get("/:id", getDictById);
router.put("/:id", Validator("dictionary"), editDict);
router.delete("/:id", deleteDict);

module.exports = router;

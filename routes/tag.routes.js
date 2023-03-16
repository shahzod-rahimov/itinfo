const { Router } = require("express");
const {
  getTags,
  addTag,
  getTagById,
  editTag,
  deleteTag,
} = require("../controllers/tag.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getTags);
router.post("/", Validator("tag"), addTag);
router.get("/:id", getTagById);
router.put("/:id", Validator("tag"), editTag);
router.delete("/:id", deleteTag);

module.exports = router;

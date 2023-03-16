const { Router } = require("express");
const {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/category.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getCategories);
router.post("/", Validator("category"), addCategory);
router.put("/:id", Validator("category"), editCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategoryById);

module.exports = router;

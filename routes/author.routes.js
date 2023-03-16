const { Router } = require("express");
const {
  getAuthors,
  getAuthorById,
  addAuthor,
  editAuthor,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorAcivate,
} = require("../controllers/author.controller");
const authorPolice = require("../middleware/authorPolice");
const Validator = require("../middleware/validator");

const router = Router();

router.get("/", getAuthors);
router.get("/activate/:link", authorAcivate);
router.post("/", Validator("author"), addAuthor);
router.post("/login", loginAuthor);
router.post("/logout", logoutAuthor);
router.get("/refresh", refreshAuthorToken);
router.get("/:id", getAuthorById);
router.put("/:id", Validator("author"), editAuthor);
router.delete("/:id", authorPolice, deleteAuthor);

module.exports = router;

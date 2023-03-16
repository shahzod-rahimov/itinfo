const { Router } = require("express");
const {
  getAuthorSocials,
  addAuthorSocial,
  getAuthorSocialById,
  editAuthorSocial,
  deleteAuthorSocial,
} = require("../controllers/author-social.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getAuthorSocials);
router.post("/", Validator("authorSocial"), addAuthorSocial);
router.get("/:id", getAuthorSocialById);
router.put("/:id", editAuthorSocial);
router.delete("/:id", deleteAuthorSocial);

module.exports = router;

const { Router } = require("express");
const {
  getSocials,
  getSocialById,
  addSocial,
  editSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getSocials);
router.post("/", Validator("social"), addSocial);
router.get("/:id", getSocialById);
router.put("/:id", Validator("social"), editSocial);
router.delete("/:id", deleteSocial);

module.exports = router;

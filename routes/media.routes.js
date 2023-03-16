const { Router } = require("express");
const {
  getMedias,
  addMedia,
  getMediaById,
  editMedia,
  deleteMedia,
} = require("../controllers/media.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getMedias);
router.post("/", Validator("media"), addMedia);
router.get("/:id", getMediaById);
router.put("/:id", Validator("media"), editMedia);
router.delete("/:id", deleteMedia);

module.exports = router;

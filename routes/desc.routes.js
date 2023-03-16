const { Router } = require("express");
const {
  getDescs,
  addDesc,
  editDesc,
  deleteDesc,
  getDescById,
} = require("../controllers/desc.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getDescs);
router.post("/", Validator("description"), addDesc);
router.put("/:id", Validator("description"), editDesc);
router.delete("/:id", deleteDesc);
router.get("/:id", getDescById);

module.exports = router;

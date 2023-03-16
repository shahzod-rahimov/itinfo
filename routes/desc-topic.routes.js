const { Router } = require("express");
const {
  getDescTopics,
  addDescTopic,
  getDescTopicById,
  editDescTopic,
  deleteDescTopic,
} = require("../controllers/desc-topic.controller");
const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getDescTopics);
router.post("/", Validator("descTopic"), addDescTopic);
router.get("/:id", getDescTopicById);
router.put("/:id", Validator("descTopic"), editDescTopic);
router.delete("/:id", deleteDescTopic);

module.exports = router;

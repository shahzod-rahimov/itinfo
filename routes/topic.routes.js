const { Router } = require("express");
const {
  getTopics,
  getTopicById,
  addTopic,
  editTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

const Validator = require("../middleware/validator");
const router = Router();

router.get("/", getTopics);
router.post("/", Validator("topic"), addTopic);
router.get("/:id", getTopicById);
router.put("/:id", Validator("topic"), editTopic);
router.delete("/:id", deleteTopic);

module.exports = router;

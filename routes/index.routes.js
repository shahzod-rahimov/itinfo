const { Router } = require("express");
const router = Router();
const dictionaryRouter = require("./dict.routes");
const descriptionRouter = require("./desc.routes");
const categoryRouter = require("./category.routes");
const topicRouter = require("./topic.routes");
const authorRouter = require("./author.routes");
const socialRouter = require("./social.routes");
const tagRouter = require("./tag.routes");
const descTopicRouter = require("./desc-topic.routes");
const mediaRouter = require("./media.routes");
const authorSocialRouter = require("./author-social.routes");
const AdminRouter = require("./admin.routes");
const UserRouter = require("./user.routes");
const response = require("./responses.routes");
const { createViewPath } = require("../helpers/helper-funcs");
const { getAuthors, getAuthorByID } = require("../controllers/authors");
const { getDictionaries, getDescriptionByID } = require("../controllers/dictionary");
const { getTopics, getTopicByID } = require("../controllers/topics");
const { getSignInPage, postSignIn } = require("../controllers/sing-in");
const { getAccountData } = require("../controllers/account");

router.use(response);

router.get("/", (req, res) => {
  res.render(createViewPath("index"), { title: "Asosiy", isHome: true });
});

router.get("/authors", getAuthors);
router.get("/author/:id", getAuthorByID);
router.get("/dict", getDictionaries);
router.get("/dict/:id", getDescriptionByID)
router.get("/topics", getTopics);
router.get("/topics/:id", getTopicByID);
router.get("/signin", getSignInPage);
router.post("/signin", postSignIn);
router.get("/account/:id", getAccountData);

router.use("/itinfo/dict", dictionaryRouter);
router.use("/itinfo/desc", descriptionRouter);
router.use("/itinfo/category", categoryRouter);
router.use("/itinfo/topic", topicRouter);
router.use("/itinfo/author", authorRouter);
router.use("/itinfo/social", socialRouter);
router.use("/itinfo/tag", tagRouter);
router.use("/itinfo/media", mediaRouter);
router.use("/itinfo/desc-topic", descTopicRouter);
router.use("/itinfo/author-social", authorSocialRouter);
router.use("/itinfo/admin", AdminRouter);
router.use("/itinfo/user", UserRouter);

module.exports = router;

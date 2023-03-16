const { Router } = require("express");
const {
  getUsers,
  addUser,
  getUserById,
  editUser,
  deleteUser,
  userLogin,
  userLogout,
  refreshUserToken,
  userActivate,
  forgetPassword,
} = require("../controllers/user.controller");
const Validator = require("../middleware/validator");
const userPolice = require("../middleware/userPolice");

const router = Router();

router.get("/", getUsers);
router.get("/activate/:link", userActivate);
router.post("/forget-pass", forgetPassword);
router.post("/", Validator("user"), addUser);
router.get("/refresh", refreshUserToken);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/:id", getUserById);
router.put("/:id", userPolice, Validator("user"), editUser);
router.delete("/:id", userPolice, deleteUser);

module.exports = router;

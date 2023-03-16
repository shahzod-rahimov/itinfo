const { Router } = require("express");
const {
  getAdmins,
  getAdminById,
  addAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
} = require("../controllers/admin.controller");
const Validator = require("../middleware/validator");
const adminPolice = require("../middleware/adminPolice");
const router = Router();

router.get("/", getAdmins);
router.get("/refresh", refreshAdminToken);
router.get("/activate/:link", adminActivate);
router.post("/", Validator("admin"), addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/:id", getAdminById);
router.put("/:id", adminPolice, Validator("admin"), editAdmin);
router.delete("/:id", adminPolice, deleteAdmin);

module.exports = router;

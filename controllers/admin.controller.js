const Admin = require("../models/Admin");
const { isValidObjectId } = require("mongoose");
const jwt = require("../services/JwtService");
const bcrypt = require("bcrypt");
const config = require("config");
const { emailValidation } = require("../helpers/helper-funcs");
const ApiError = require("../errors/ApiError");
const uuid = require("uuid");
const mailService = require("../services/MailService");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (!admins.length) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, admins);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const admin = await Admin.findById(id);
    if (!admin) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;

    const adminHashedPassword = bcrypt.hashSync(admin_password, 7);
    const admin_activation_link = uuid.v4();
    const admin = await Admin({
      admin_name,
      admin_email,
      admin_password: adminHashedPassword,
      admin_is_active,
      admin_is_creator,
      admin_activation_link,
    });

    await admin.save();

    await mailService.sendActivationMail(
      admin_email,
      `${config.get("api_url")}/itinfo/admin/activate/${admin_activation_link}`
    );

    const payload = {
      id: admin._id,
      admin_is_activated: admin.admin_is_activated,
    };

    const tokens = jwt.generateTokens(payload);
    admin.admin_token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.ok(200, { ...tokens, admin: payload });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const adminActivate = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      admin_activation_link: req.params.link,
    });

    if (!admin) return res.error(400, { friendlyMsg: "Not Found" });
    if (admin.admin_is_activated)
      return res.error(400, { frindlyMsg: "Admin already exists" });

    admin.admin_is_activated = true;
    await admin.save();

    res.ok(200, "Admin activated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const admin = await Admin.findByIdAndUpdate(id, req.body);
    if (!admin) return res.error(400, { friendlyMsg: "Not Found" });

    // const edited = {
    //   admin_name: admin_name || admin.admin_name,
    //   admin_email: admin_email || admin.admin_email,
    //   admin_password: admin_password || admin.admin_password,
    //   admin_is_active: admin_is_active || admin.admin_is_active,
    //   admin_is_creator: admin_is_creator || admin.admin_is_creator,
    // };

    // const { error, value } = AdminValidation(edited);
    // if (error) return res.error(400, { friendlyMsg: error.details[0].message });

    // await Admin.updateOne({ _id: id }, value);

    res.ok(200, "Admin edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const admin = await Admin.findOneAndRemove(id);
    if (!admin) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "Admin deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    let admin;
    const { admin_email, admin_password } = req.body;
    if (emailValidation(admin_email))
      admin = await Admin.findOne({ admin_email });

    if (!admin)
      return res.error(400, {
        frindlyMsg: "Email yoki Password noto'g'ri",
      });

    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );

    if (!validPassword)
      return res.error(400, {
        friendlyMsg: "Email yoki Password noto'g'ri",
      });

    const payload = {
      id: admin._id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_creator,
    };

    const tokens = jwt.generateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let admin;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });
    admin = await Admin.findOneAndUpdate(
      { admin_token: refreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) return res.error(400, { friendlyMsg: "Token topilmadi" });

    res.clearCookie("refreshToken");
    res.ok(200, admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });
    const adminDataFromCookie = await jwt.verifyRefresh(refreshToken);

    const adminDataFromDB = await Admin.findOne({ admin_token: refreshToken });

    if (!adminDataFromCookie || !adminDataFromDB) {
      return res.error(400, { friendlyMsg: "Admin ro'yhatdan o'tmagan" });
    }

    const admin = await Admin.findById(adminDataFromCookie.id);
    if (!admin) return res.error(400, { friendlyMsg: "ID noto'g'ri" });

    const payload = {
      id: admin._id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_creator,
    };

    const tokens = jwt.generateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  addAdmin,
  editAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
};

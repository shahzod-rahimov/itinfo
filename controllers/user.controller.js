const User = require("../models/User");
const { isValidObjectId } = require("mongoose");
const jwt = require("../services/JwtService");
const config = require("config");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/ApiError");
const mailService = require("../services/MailService");
const uuid = require("uuid");
var passGenerator = require("generate-password");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, users);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const user = await User.findById(id);
    if (!user) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, user);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addUser = async (req, res) => {
  try {
    let { user_name, user_email, user_password, user_info, user_photo } =
      req.body;
    const userHashedPassword = bcrypt.hashSync(user_password, 7);

    const user_activation_link = uuid.v4();

    const user = await User({
      user_name,
      user_email,
      user_password: userHashedPassword,
      user_info,
      user_photo,
      user_activation_link,
    });

    await user.save();
    await mailService.sendActivationMail(
      user_email,
      `${config.get("api_url")}/itinfo/user/activate/${user_activation_link}`
    );

    const payload = {
      id: user._id,
      user_is_active: user.user_is_active,
    };

    const tokens = jwt.generateTokens(payload);
    user.user_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.ok(200, { ...tokens, user: payload });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const userActivate = async (req, res) => {
  try {
    const link = req.params.link;
    const user = await User.findOne({ user_activation_link: link });
    if (!user) return res.error(400, { friendlyMsg: "Not Found" });

    if (user.user_is_active)
      return res.error(400, { friendlyMsg: "User already activated" });

    user.user_is_active = true;
    await user.save();
    res.ok(200, "User activated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { user_email } = req.body;
    if (!user_email.length)
      return res.error(400, { friendlyMsg: "Email bush bulmaydi" });
    const user = await User.findOne({ user_email });

    if (!user) return res.error(400, { friendlyMsg: "Not Found" });

    let password = passGenerator.generate({
      length: 10,
      numbers: true,
    });

    const userHashedPassword = bcrypt.hashSync(password, 7);
    user.user_password = userHashedPassword;

    await user.save();

    await mailService.transporter.sendMail({
      from: config.get("smtp_user"),
      to: user.user_email,
      subject: "ITINFO akkaunti parolini o'zgartirish",
      text: "",
      html: `
            <div>
                <h1>Yangi parol -> ${password}</h1>
            </div>
            `,
    });

    res.ok(200, "Password updated");
    // const id = req.params.id;
    // const user = await User.findById(id);
    // if (!user) return res.error(400, { friendlyMsg: "Not found" });

    // await mailService.transporter.sendMail({
    //   from: config.get("smtp_user"),
    //   to: user.user_email,
    //   subject: "ITINFO akkaunti parolini o'zgartirish",
    //   text: "",
    //   html: `
    //         <div>
    //             <h1>Akkauntni parolini o'zgartirish uchun quyidagi linkni bosing</h1>
    //             <a href="${`${config.get("api_url")}/itinfo/user/change-pass`}">
    //             ${`${config.get("api_url")}/itinfo/user/change-pass`}
    //             </a>
    //         </div>
    //         `,
    // });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_info, user_photo } =
      req.body;
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) return res.error(400, { friendlyMsg: "Not Found" });

    // const edited = {
    //   user_name: user_name || user.user_name,
    //   user_email: user_email || user.user_email,
    //   user_password: user_password || user.user_password,
    //   user_info: user_info || user.user_info,
    //   user_photo: user_photo || user.user_photo,
    // };

    // const { error, value } = UserValidation(edited);
    // if (error) return res.error(400, { friendlyMsg: error.details[0].message });

    // await User.updateOne({ _id: id }, value);
    res.ok(200, "User edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const user = await User.findOneAndRemove(id);
    if (!user) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, "User deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });

    if (!user)
      return res.error(400, { friendlyMsg: "Email yoki Password noto'g'ri" });

    const validPassword = bcrypt.compareSync(user_password, user.user_password);
    if (!validPassword)
      return res.error(400, { friendlyMsg: "Email yoki Password noto'g'ri" });

    const payload = {
      id: user._id,
    };

    const tokens = jwt.generateTokens(payload);

    user.user_token = tokens.refreshToken;
    await user.save();
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

const userLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let user;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });
    user = await User.findOneAndUpdate(
      { user_token: refreshToken },
      { user_token: "" },
      { new: true }
    );
    if (!user) return res.error(400, { friendlyMsg: "Token topilmadi" });

    res.clearCookie("refreshToken");
    res.ok(200, user);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });
    const userDataFromCookie = await jwt.verifyRefresh(refreshToken);

    const userDataFromDB = await User.findOne({ user_token: refreshToken });

    if (!userDataFromCookie || !userDataFromDB) {
      return res.error(400, { friendlyMsg: "User ro'yhatdan o'tmagan" });
    }

    const user = await User.findById(userDataFromCookie.id);
    if (!user) return res.error(400, { friendlyMsg: "ID noto'g'ri" });

    const payload = {
      id: user._id,
    };

    const tokens = jwt.generateTokens(payload);

    user.user = tokens.refreshToken;
    await user.save();
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
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
  userLogin,
  userLogout,
  refreshUserToken,
  userActivate,
  forgetPassword,
};

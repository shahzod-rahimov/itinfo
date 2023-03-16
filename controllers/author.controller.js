const { isValidObjectId } = require("mongoose");
const Author = require("../models/Author");
const { authorValidation } = require("../validations/author");
const bcrypt = require("bcrypt");
const jwt = require("../services/JwtService");
const config = require("config");
const ApiError = require("../errors/ApiError");
const uuid = require("uuid");
const mailService = require("../services/MailService");
const { findOne } = require("../models/Author");

// const { errorHandler } = require("../helpers/helper-funcs");

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    if (!authors.length) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, authors);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const author = await Author.findById(id);
    if (!author) return res.error(400, { friendlyMsg: "Not Found" });

    res.ok(200, author);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const addAuthor = async (req, res) => {
  try {
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      author_photo,
      is_export,
    } = req.body;

    const authorHashedPassword = bcrypt.hashSync(author_password, 7);
    const author_activation_link = uuid.v4();

    const author = Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password: authorHashedPassword,
      author_info,
      author_position,
      author_photo,
      is_export,
      author_activation_link,
    });

    await author.save();

    await mailService.sendActivationMail(
      author_email,
      `${config.get(
        "api_url"
      )}/itinfo/author/activate/${author_activation_link}`
    );

    const payload = {
      id: author._id,
      author_is_active: author.author_is_active,
    };

    const tokens = jwt.generateTokens(payload);
    author.author_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.ok(200, { ...tokens, author: payload });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const authorAcivate = async (req, res) => {
  try {
    const author = await Author.findOne({
      author_activation_link: req.params.link,
    });
    if (!author) return res.error(400, { friendlyMsg: "Not Found" });

    if (author.author_is_active)
      return res.error(400, { friendlyMsg: "Author already activated" });

    author.author_is_active = true;
    await author.save();
    res.ok(200, "Author activated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const editAuthor = async (req, res) => {
  try {
    // const {
    //   author_first_name,
    //   author_last_name,
    //   author_nick_name,
    //   author_email,
    //   author_phone,
    //   author_password,
    //   author_info,
    //   author_position,
    //   author_photo,
    //   is_export,
    // } = req.body;
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.error(400, { friendlyMsg: "Invalid id" });

    const author = await Author.findByIdAndUpdate(id, req.body);
    if (!author) return res.error(400, { friendlyMsg: "Not Found" });

    // const edited = {
    //   author_first_name: author_first_name || author.author_first_name,
    //   author_last_name: author_last_name || author.author_last_name,
    //   author_nick_name: author_nick_name || author.author_nick_name,
    //   author_email: author_email || author.author_email,
    //   author_phone: author_phone || author.author_phone,
    //   author_password: author_password || author.author_password,
    //   author_info: author_info || author.author_info,
    //   author_position: author_position || author.author_position,
    //   author_photo: author_photo || author.author_photo,
    //   is_export: is_export || author.is_export,
    // };

    res.ok(200, "Author edited");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const deleteAuthor = async (req, res) => {
  try { 
    const id = req.params.id;
    console.log(req.author);
    if (id !== req.author.id) {
      return ApiError.unauthorized(res, {
        friendlyMsg: "Sizda bunday huquq yo'q",
      });
    }
    // console.log(1);
    
    const result = Author.findOne({ _id: id });

    if (result == null) {
      console.log(1);
      return res.error(400, { friendlyMsg: "Id is incorrect" });
    }


    const author = await Author.findOneAndRemove({ _id: id });
    if (!author) return res.error(400, { friendlyMsg: "Not Found" });
    res.ok(200, "Author deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { login, author_password } = req.body;
    if (login == "" || author_password == "")
      return res.error(400, { friendlyMsg: "input field is not empty" });
    // res.status(400).send("input field is not empty");

    let author = await Author.findOne({ author_nick_name: login });

    if (!author) author = await Author.findOne({ author_email: login });

    if (!author) author = await Author.findOne({ author_phone: login });

    if (!author)
      return res.error(400, { friendlyMsg: "login or password wrong" });
    // res.status(404).send("login or password wrong");

    const validPassword = bcrypt.compareSync(
      author_password,
      author.author_password
    );

    if (!validPassword)
      return res.error(400, { friendlyMsg: "login or password wrong" });
    // res.status(400).send("login or password wrong");

    const payload = {
      id: author._id,
      is_export: author.is_export,
    };

    const tokens = jwt.generateTokens(payload);
    author.author_token = tokens.refreshToken;
    await author.save();
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

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let author;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });

    author = await Author.findOneAndUpdate(
      { author_token: refreshToken },
      { author_token: "" },
      { new: true }
    );
    if (!author) return res.error(400, { friendlyMsg: "Token topilmadi" });

    res.clearCookie("refreshToken");
    res.ok(200, author);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token topilmadi" });

    const authorDataFromCookie = await jwt.verifyRefresh(refreshToken);
    const authorDataFromDB = await Author.findOne({
      author_token: refreshToken,
    });

    if (!authorDataFromCookie || !authorDataFromDB) {
      return res.error(400, { friendlyMsg: "Author ro'yhatdan o'tmagan" });
    }

    const author = await Author.findById(authorDataFromCookie.id);
    if (!author) return res.error(400, { friendlyMsg: "ID noto'g'ri" });

    const payload = {
      id: author._id,
      is_export: author.is_export,
    };

    const tokens = jwt.generateTokens(payload);

    author.author_token = tokens.refreshToken;
    await author.save();
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
  getAuthors,
  getAuthorById,
  addAuthor,
  editAuthor,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorAcivate,
};

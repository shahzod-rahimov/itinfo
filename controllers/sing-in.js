const { createViewPath } = require("../helpers/helper-funcs");
const Author = require("../models/Author");
const bcrypt = require("bcrypt");
const config = require("config");

const getSignInPage = async (req, res) => {
  try {
    res.render(createViewPath("sign-in"), {
      title: "Kirish",
      isSignIn: true,
    });
  } catch (error) {
    res.send(error);
  }
};

const postSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let login = await Author.findOne({ author_email: email });
    if (!login) {
      return res.render(createViewPath("error"), {
        title: Error,
        text: "Login or password wrong",
      });
    }
    const validPassword = bcrypt.compareSync(password, login.author_password);
    if (!validPassword) {
      res.render(createViewPath("error"), {
        title: "Error",
        text: "Login or password wrong",
      });
    }

    res.redirect(config.get("api_url") + "/account/" + login._id); //createViewPath("account"), { title: "Account", data }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getSignInPage, postSignIn };

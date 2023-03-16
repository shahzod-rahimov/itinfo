const Author = require("../models/Author");
const { createViewPath } = require("../helpers/helper-funcs");

const getAccountData = async (req, res) => {
  const id = req.params.id;
  const author = await Author.findById(id);
  const data = {
    id: author._id,
    name: author.author_first_name,
  };

  res.render(createViewPath("account"), {
    title: "Account",
    isLoged: true,
    isAccount: true,
    data,
  });
};

module.exports = { getAccountData };

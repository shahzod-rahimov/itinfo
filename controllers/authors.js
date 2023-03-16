const Author = require("../models/Author");
const { createViewPath } = require("../helpers/helper-funcs");

const getAuthors = async (req, res) => {
  let data = [];
  const authors = await Author.find({});

  authors.forEach((el) => {
    data.push({
      id: el._id,
      fullname: `${el.author_first_name} ${el.author_last_name}`,
      // nick_name: el.author_nick_name,
      // email: el.author_email,
      // phone: el.author_phone,
      // info: el.author_info,
      // position: el.author_position,
      // img: el.author_photo,
    });
  });
  res.render(createViewPath("authors"), {
    title: "Mualliflar",
    isAuthor: true,
    data,
  });
};

const getAuthorByID = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    const data = {
      fullname: `${author.author_first_name} ${author.author_last_name}`,
      firstName: author.author_first_name,
      lastName: author.author_last_name,
      nick_name: author.author_nick_name,
      email: author.author_email,
      phone: author.author_phone,
      info: author.author_info,
      position: author.author_position,
      img: author.author_photo,
      is_expert: author.is_export
    };

    res.render(createViewPath("author"), {
      title: "Muallif",
      isAuthor: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAuthors, getAuthorByID };

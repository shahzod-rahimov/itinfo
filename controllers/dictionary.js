const Dictionary = require("../models/Dictionary");
const Description = require("../models/Description");
const { createViewPath } = require("../helpers/helper-funcs");

const getDictionaries = async (req, res) => {
  let data = [];
  const dict = await Dictionary.find({});

  dict.forEach((el) => {
    data.push({
      id: el._id,
      term: el.term.slice(0, 1).toUpperCase() + el.term.slice(1),
    });
  });

  res.render(createViewPath("dictionary"), {
    title: "Lug'atlar",
    isDict: true,
    data,
  });
};

const getDescriptionByID = async (req, res) => {
  try {
    const id = req.params.id;
    const desc = await Description.findOne({ dict_id: id });
    const dict = await Dictionary.findById(id);
    const data = {
      term: dict.term.slice(0, 1).toUpperCase() + dict.term.slice(1),
      description: desc.description,
    };
    res.render(createViewPath("description"), {
      title: "Ta'rif",
      isDict: true,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getDictionaries, getDescriptionByID };

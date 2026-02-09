const { Author } = require("../database");

const createAuthor = async (data) => {
  const newAuthor = await Author.create(data);
  return newAuthor;
};

module.exports = {
  createAuthor,
};

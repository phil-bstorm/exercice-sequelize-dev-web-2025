const { Op } = require("sequelize");
const { Book, Author } = require("../database");

const createBook = async (data) => {
  const newBook = await Book.create(data);
  return newBook;
};

const getBooksByAuthor = async (authorId) => {
  const books = await Book.findAll({
    where: {
      // authorId: authorId
      authorId, // fais la même chose que la ligne d'avant
    },
  });
  return books;
};

const getBooksByAuthorName = async (authorName) => {
  const books = await Book.findAll({
    include: [
      {
        model: Author,
        as: "author",
        where: {
          name: {
            [Op.iLike]: `${authorName}%`,
          },
        },
      },
    ],
  });
  return books;
};

module.exports = {
  createBook,
  getBooksByAuthor,
  getBooksByAuthorName,
};

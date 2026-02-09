const { sequelize } = require("./config");

const Author = require("./entities/author.entity");
const Book = require("./entities/book.entity");
const User = require("./entities/user.entity");

Book.belongsTo(Author, {
  as: "author",
  foreignKey: {
    allowNull: false,
  },
});
Author.hasMany(Book, {
  as: "books",
  foreignKey: "authorId",
});

User.belongsToMany(Book, {
  through: "User_Borrow_Book",
  as: "borrow",
  foreignKey: "userId",
  otherKey: "bookId",
});
Book.belongsToMany(User, {
  through: "User_Borrow_Book",
  as: "borrow",
  foreignKey: "bookId",
  otherKey: "userId",
});

module.exports = {
  sequelize,
  Author,
  Book,
  User,
};

const { User, Book, Author } = require("../database");

const createUser = async (data) => {
  const newUser = await User.create(data);
  return newUser;
};

const borrowBook = async (userId, bookId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const book = await Book.findOne({
    where: {
      id: bookId,
    },
  });
  if (!book) {
    throw new Error("Book not found.");
  }

  await user.addBorrow(book);
};

const getBorrowedBooks = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    // méthode 1 pour récupérer les livres d'un user: include
    include: [
      {
        model: Book,
        as: "borrow",
        include: [
          {
            model: Author,
            as: "author",
          },
        ],
      },
    ],
  });
  console.log(user);

  // méthode 2 pour récupérer les livres d'un user: magic function
  const books = await user.getBorrow({
    include: [
      {
        model: Author,
        as: "author",
      },
    ],
  });
  console.log(books);

  return user.borrow;
};

module.exports = {
  createUser,
  borrowBook,
  getBorrowedBooks,
};

require("dotenv").config();

const { sequelize } = require("./database");

const authorService = require("./services/author.service");
const bookService = require("./services/book.service");
const userService = require("./services/user.service");

const main = async () => {
  await sequelize.authenticate();
  console.log("Database connectée");

  // force: true => remise à zéro de la database
  // ATTENTION NE JAMAIS LAISSER force: true en production
  await sequelize.sync({ force: true });
  // Création des auteurs
  const rowling = await authorService.createAuthor({ name: "J.K. Rowling" });
  const tolkien = await authorService.createAuthor({
    name: "J.R.R. Tolkien",
  });
  const martin = await authorService.createAuthor({
    name: "George R.R. Martin",
  });

  // Création des livres
  const hp1 = await bookService.createBook({
    title: "Harry Potter à l'école des sorciers",
    releaseYear: 1997,
    authorId: rowling.id,
  });
  const lotr = await bookService.createBook({
    title: "Le Seigneur des Anneaux",
    releaseYear: 1954,
    authorId: tolkien.id,
  });
  const got = await bookService.createBook({
    title: "Le Trône de Fer",
    releaseYear: 1996,
    authorId: martin.id,
  });

  // Création des utilisateurs
  const user1 = await userService.createUser({ username: "reader1" });
  const user2 = await userService.createUser({ username: "reader2" });

  // Emprunt de livres
  await userService.borrowBook(user1.id, hp1.id);
  await userService.borrowBook(user2.id, lotr.id);

  // Affichage des livres empruntés par user1
  const user1Books = await userService.getBorrowedBooks(user1.id);
  console.log(`Livres empruntés par ${user1.username}:`);
  user1Books.forEach((book) => {
    console.log(`- ${book.title}`);
    console.log(`  Auteur: ${book.author.name}`);
  });

  // Affichage des livres par auteur J.K. Rowling
  const rowlingBooks = await bookService.getBooksByAuthor(rowling.id);
  console.log(`Livres de ${rowling.name}:`);
  rowlingBooks.forEach((book) => {
    console.log(`- ${book.title}`);
  });

  const rowlingBooks2 = await bookService.getBooksByAuthorName("J.K.");
  console.log(`Livres de ${rowling.name}:`);
  rowlingBooks2.forEach((book) => {
    console.log(`- ${book.title}`);
  });

  process.exit(0);
};

main();

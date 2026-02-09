# Exercice Sequelize

Créer un nouveau projet pour gérer une bibliothèque de livres en utilisant Sequelize.

## Consignes

- Mettre en place la structure de projet vue au cours
- Créer des fichier:
  - author.service.js (qui gère les intéractions avec la table author)
  - book.service.js (qui gère les intéractions avec la table livre)
  - user.service.js (qui gère les intéractions avec la table user)
- faite en sorte que dans votre fichier `src/index.js`: vous n'ayez que l'importation des services, de sequelize et l'appel d'une fonction `main` qui se trouve dans un fichier `index.js`.
  Exemple de fonction main:

  ```js
  const bookService = require("./book.service");
  const authorService = require("./author.service");
  const userService = require("./user.service");

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
      console.log(`  Auteur: ${book.Author.name}`);
    });

    // Affichage des livres par auteur J.K. Rowling
    const rowlingBooks = await bookService.getBooksByAuthor(rowling.id);
    console.log(`Livres de ${rowling.name}:`);
    rowlingBooks.forEach((book) => {
      console.log(`- ${book.title}`);
    });

    process.exit(0);
  };

  main();
  ```

### Bonus (règle métier)

Modifier votre base de données pour ajouter une colonne `until_date` dans la table des emprunts pour indiquer la date jusqu'à laquelle l'utilisateur peut garder le livre emprunté. Lors de l'emprunt d'un livre, cette date doit être fixée à 30 jours après la date d'emprunt. Lors qu'un utilisateur souhaite emprunter un livre que ce livre n'est pas déjà emprunté.

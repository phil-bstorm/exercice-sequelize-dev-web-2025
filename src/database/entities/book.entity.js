const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Book = sequelize.define("Books", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Book;

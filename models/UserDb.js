const Sequelize = require("sequelize");

const sequelize = new Sequelize("Expenses-AWS", "root", "Pj@8106228817", {
  dialect: "mysql",
  host: "localhost",
});

const UserDetails = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, UserDetails };

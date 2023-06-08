const Sequelize = require("sequelize");

const sequelize = new Sequelize("Expenses", "root", "Pj@8106228817", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

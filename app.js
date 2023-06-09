const express = require("express");
const app = express();

const cors = require("cors");

const routes = require("./routes/router");

const sequelize = require("./util/database");

const User = require("./models/UserDb");
const Expense = require("./models/expense");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

User.hasMany(Expense);
Expense.belongsTo(User);

app.use("/", routes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

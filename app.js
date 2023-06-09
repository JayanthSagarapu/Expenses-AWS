const express = require("express");
const app = express();

const cors = require("cors");

const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");

const sequelize = require("./util/database");

const User = require("./models/UserDb");
const Expense = require("./models/expense");
const Order = require("./models/purchase");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/purchase", purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

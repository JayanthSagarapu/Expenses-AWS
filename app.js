const express = require("express");
const app = express();

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");
const premiumUserRoutes = require("./routes/premiumUser");
const forgetPasswordRoutes = require("./routes/forgotPassword");

const sequelize = require("./util/database");

const User = require("./models/UserDb");
const Expense = require("./models/expense");
const Order = require("./models/purchase");
const Forgotpassword = require("./models/forgotPassword");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumUserRoutes);
app.use("/password", forgetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

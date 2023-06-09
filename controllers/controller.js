const User = require("../models/UserDb");
const bcrypt = require("bcrypt");
const Expense = require("../models/expense");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      const user = await User.create({
        username: username,
        email: email,
        password: hash,
      });
      res.status(200).json({
        message: "Successfully Created new User",
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

async function genereteToken(id) {
  return jwt.sign({ userId: id }, "jayanthsecretkey");
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            token: genereteToken(user.id),
          });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Password is wrong" });
        }
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "User not found in table" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.send(expense);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  res.send(expenses);
};

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  await Expense.destroy({ where: { id: expenseId } });
  res.status(200).json({
    message: "Successfully deleted Expense",
  });
};

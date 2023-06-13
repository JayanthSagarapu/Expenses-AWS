const User = require("../models/UserDb");
const bcrypt = require("bcrypt");
const Expense = require("../models/expense");
const jwt = require("jsonwebtoken");

const addUser = async (req, res, next) => {
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

const generateAccessToken = (id, username, ispremiumuser) => {
  return jwt.sign(
    { userId: id, username: username, ispremiumuser },
    "jayanthsecretkey"
  );
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const founduser = await User.findOne({ where: { email } });
    if (founduser) {
      bcrypt.compare(password, founduser.password, (err, result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            token: generateAccessToken(
              founduser.id,
              founduser.username,
              founduser.ispremiumuser
            ),
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

const createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: req.user.id,
    });

    const total_Expense = Number(req.user.total_Expense) + Number(amount);
    await User.update(
      { total_Expense: total_Expense },
      { where: { id: req.user.id } }
    );
    res.send(expense);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  res.send(expenses);
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  const expense = await Expense.findOne({
    where: { id: expenseId, userId: req.user.id },
  });

  if (expense) {
    await Expense.destroy();
    res.status(200).json({
      message: "Successfully deleted Expense",
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  createExpense,
  getExpenses,
  deleteExpense,
  generateAccessToken,
};

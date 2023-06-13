const User = require("../models/UserDb");
const Expense = require("../models/expense");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userexpensesadditon = {};

    expenses.forEach((expense) => {
      if (userexpensesadditon[expense.userId]) {
        userexpensesadditon[expense.userId] += expense.amount;
      } else {
        userexpensesadditon[expense.userId] = expense.amount;
      }
    });

    var leaderboardDetails = [];
    users.forEach((user) => {
      leaderboardDetails.push({
        username: user.username,
        totalExpense: userexpensesadditon[user.id] || 0,
      });
    });
    leaderboardDetails.sort((a, b) => b.totalExpense - a.totalExpense);
    res.status(200).json(leaderboardDetails);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserLeaderBoard };

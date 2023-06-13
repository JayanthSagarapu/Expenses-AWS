const User = require("../models/UserDb");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

const getUserLeaderBoard = async (req, res) => {
  try {
    const leaderboardDetails = await User.findAll({
      attributes: [
        "id",
        "username",
        [
          sequelize.fn("sum", sequelize.col("expenses.amount")),
          "total_Expense",
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [["total_Expense", "DESC"]],
    });
    res.status(200).json(leaderboardDetails);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserLeaderBoard };

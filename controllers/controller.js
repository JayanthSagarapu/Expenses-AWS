const { sequelize, UserDetails } = require("../models/UserDb");

exports.home = async (req, res) => {
  res.send("home");
};

exports.addUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserDetails.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(user);
};

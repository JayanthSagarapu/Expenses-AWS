const User = require("../models/UserDb");

exports.addUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username: username,
    email: email,
    password: password,
  });
  console.log(user);
  res.send(user);
};

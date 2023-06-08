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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ where: { email } });
  if (finduser) {
    if (password == finduser.password) {
      res.status(200).json({
        message: "Successfully Logged In",
      });
    } else {
      res.status(403).json({ message: "Password is wrong" });
    }
  } else {
    res.status(404).json({ message: "User not found in table" });
  }
};

const jwt = require("jsonwebtoken");
const User = require("../models/UserDb");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    const userId = jwt.verify(token, "jayanthsecretkey");
    const user = await User.findByPk(userId);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

module.exports = { authenticate };

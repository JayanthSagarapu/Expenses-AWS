const express = require("express");
const router = express.Router();

const userController = require("../controllers/controller");

router.post("/signup", userController.addUser);

module.exports = router;

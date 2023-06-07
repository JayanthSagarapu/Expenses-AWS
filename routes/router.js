const express = require("express");
const router = express.Router();

const signUpController = require("../controllers/controller");

router.get("/", signUpController.home);

router.post("/user/signup", signUpController.addUser);

module.exports = router;

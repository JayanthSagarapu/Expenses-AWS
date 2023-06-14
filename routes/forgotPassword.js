const express = require("express");

const router = express.Router();

const forgetPasswordController = require("../controllers/forgotPassword");

router.post("/forgotpassword", forgetPasswordController.forgotPassword);

module.exports = router;

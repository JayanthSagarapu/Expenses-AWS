const express = require("express");
const router = express.Router();

const userController = require("../controllers/controller");

router.post("/user/signup", userController.addUser);

router.post("/user/login", userController.loginUser);

router.post("/expenses/createExpense", userController.createExpense);

router.get("/getExpenses", userController.getExpenses);

router.delete("/deleteExpense/:id", userController.deleteExpense);

module.exports = router;

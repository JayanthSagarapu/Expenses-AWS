const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const bcrypt = require("bcrypt");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const uuid = require("uuid");
const User = require("../models/UserDb");
const Forgotpassword = require("../models/forgotPassword");

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const id = uuid.v4();
      await user.createForgotpassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });
      // Send email using Sendinblue API
      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sendEmail = {
        to: [{ email: email }],
        sender: {
          email: "jay@gmail.com",
          name: "jay",
        },
        subject: "Reset Password",
        textContent: "Reset Your PassWord",
        htmlContent: `<p>Hello,</p>
                        <p>Please click the following link to reset your password:</p>
                        <p><a href="http://15.206.28.85:3000/password/resetpassword/${id}">Reset password</a></p>
                        <p>If you did not request a password reset, please ignore this email.</p>
                        <p>Thank you!</p>`,
      };

      await tranEmailApi.sendTransacEmail(sendEmail);
      return res.status(200).json({
        message: "Link to reset password sent to your email",
        success: true,
      });
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, success: false });
  }
};

const resetpassword = async (req, res) => {
  try {
    const id = req.params.id;
    const forgotpasswordrequest = await Forgotpassword.findOne({
      where: { id },
    });

    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ isactive: false });
      res.status(200).send(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
            integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
            crossorigin="anonymous"
          />
          <title>Reset Password</title>
        </head>
        <body>
          <header class="header bg-dark text-white p-3 d-flex flex-row mb-4">
              <h1 class="ml-5">
                <a
                  href="/views/home.html"
                  style="cursor: pointer; text-decoration: none; color: white"
                  >Daily Expenses</a
                >
              </h1>
        
              <ul class="nav ml-auto mr-5 mt-3">
                <li class="mr-2">
                  Create Account
                  <button id="sign" style="cursor: pointer">SignUp</button>
                </li>
                <li>
                  <button id="login" class="active" style="cursor: pointer">
                    Login
                  </button>
                </li>
              </ul>
            </header>
        
            <div class="card card-body m-auto w-25 align-items-center">
              <form
                action="/password/updatepassword/${id}"
                method="get"
                class="d-flex flex-column w-75"
              >
              <h4 class="text-center text-danger">Forgot Password</h4> 
                Enter new Password:<input
                  type="password"
                  id="newpassword"
                  placeholder="new password"
                  required
                />
                <button class="bg-dark text-white mt-2" style="cursor: pointer;">Reset Password</button>
          </form>  
        </body>
      </html>
      `);
      res.end();
    }
  } catch (err) {
    console.log(err);
  }
};

const updatepassword = async (req, res) => {
  try {
    const newpassword = req.query.newpassword;
    const newpasswordid = req.params.id;
    const resetpasswordrequest = await Forgotpassword.findOne({
      where: { id: newpasswordid },
    });
    const user = await User.findOne({
      where: { id: resetpasswordrequest.userId },
    });
    if (user) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        bcrypt.hash(newpassword, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          user.update({ password: hash }).then(() => {
            res
              .status(201)
              .json({ message: "Successfuly update the new password" });
          });
        });
      });
    } else {
      return res.status(404).json({ error: "No user Exists", success: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ err, success: false });
  }
};

module.exports = {
  forgotpassword,
  resetpassword,
  updatepassword,
};

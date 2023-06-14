const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;
//   "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";

const User = require("../models/UserDb");

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    // const user = await User.findOne({ where: { email: email } });

    const tranEmailAPi = new Sib.TransactionalEmailsApi();

    const sendEmail = {
      to: [{ email: email }],
      sender: {
        email: "jay@gmail.com",
        name: "jay",
      },
      subject: "Reset Password",
      textContent: "Reset your Password",
    };

    await tranEmailAPi.sendTransacEmail(sendEmail);
    return res.status(200).json({
      message: "Link to reset password sent to your email",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

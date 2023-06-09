const Razorpay = require("razorpay");
const Order = require("../models/purchase");

exports.purchasePremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 3000;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "Pending" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Problem in purchase", error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "Successful",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2]).then(() => {
      return res.status(202).json({
        sucess: true,
        message: "Transaction Successful",
      });
    });
  } catch (err) {
    res
      .status(403)
      .json({ errpr: err, message: "update Transaction controller problem" });
  }
};

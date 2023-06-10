const Razorpay = require("razorpay");
const Order = require("../models/purchase");

exports.purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_JpsZOujIVbRMk3",
      key_secret: "frGxUe2e0luM7vzGyIPIqlOY",
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
    console.log(payment_id, order_id);
    // const order = await Order.findOne({ where: { orderid: order_id } });
    // const promise1 = order.update({
    //   paymentid: payment_id,
    //   status: "Successful",
    // });
    // console.log(promise1);
    // const promise2 = req.user.update({ ispremiumuser: true });

    // Promise.all([promise1, promise2]).then(() => {
    //   return res.status(202).json({
    //     success: true,
    //     message: "Transaction Successful",
    //   });
    // });
    Order.findOne({ where: { orderid: order_id } })
      .then((order) => {
        order
          .update({ paymentid: payment_id, status: "SUCCESSFUL" })
          .then(() => {
            req.user
              .update({ ispremiumuser: true })
              .then(() => {
                return res
                  .status(202)
                  .json({ success: true, message: "Transaction Successful" });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res
      .status(403)
      .json({ errpr: err, message: "update Transaction controller problem" });
  }
};

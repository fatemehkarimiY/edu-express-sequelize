const { PAYMENT_STATUS, ORDER_STATUS } = require("../../constants/enums");
const Payment = require("./payment.model");
const { Order, OrderItem } = require("./../order/order.model");
const User = require("./../user/user.model");
const { getPendingEnrollments } = require("../enrollment/enrollment.service");
const {
  zarinpalRequest,
  zarinpalVerify,
} = require("../zarinpal/zarinpal.service");
const createHttpError = require("http-errors");
async function payment({ userId }) {
  //getUserEnrollmentThatReadyToPay
  const enrollments = await getPendingEnrollments(userId);
  const finalAmount = 100; //todo calculate price
  const payment = await Payment.create({
    userId,
    amount: finalAmount,
    // status: PAYMENT_STATUS.PENDING, //todo check this field
  });
  const order = await Order.create({
    userId,
    paymentId: payment.id,
    status: ORDER_STATUS.PENDING,
  });
  payment.orderId = order.id;
  let orderList = [];
  for (const item of enrollments) {
    orderList.push({
      courseId: item.courseId,
      orderId: order.id,
    });
  }

  OrderItem.bulkCreate(orderList);
  const user = await User.findByPk(userId, { raw: true });
  const result = await zarinpalRequest({ amount: finalAmount, user });
  payment.authority = result?.authority;
  await payment.save();
  return result;
}

async function verify(Authority, Status) {
  if (Authority) {
    const payment = await Payment.findOne({ where: { authority: Authority } });
    if (!payment) throw createHttpError(404, "payment not found");
    const order = await Order.findByPk(payment.orderId);
    if (!order) throw createHttpError(404, "order not found");

    if (Status === "OK") {
      const result = await zarinpalVerify(payment?.amount, payment?.authority);
      if (result) {
        payment.status = PAYMENT_STATUS.SUCCESSFUL;
        payment.refId = result.ref_id ?? "32456";
        order.status = ORDER_STATUS.COMPLETED;
        await order.save();
        //todo enrollments status????
        // return res.redirect("http://frontenddomain.com/payment?status=success");
      } else {
        payment.status = PAYMENT_STATUS.FAILED;
        await payment.save();
      }
    } else if (Status === "NOK") {
      payment.status = PAYMENT_STATUS.FAILED;
      await payment.save();
      order.status = ORDER_STATUS.FAILED;
      await order.save();
    }
  } else {
    throw createHttpError(404, "Authority not found");
  }
}
module.exports = {
  payment,
  verify,
};

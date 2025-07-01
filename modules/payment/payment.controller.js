const PaymentService = require("./payment.service");
async function payment(req, res, next) {
  try {
    const userId = req.user;
    const result = await PaymentService.payment({ userId });
    res.status(200).json({
      data: result,
      message: "payment ...",
    });
  } catch (error) {
    next(error);
  }
}

async function paymentVerify(req, res, next) {
  try {
    const { Authority, Status } = req?.body;
    const result = await PaymentService.verify(Authority, Status);
    res.status(200).json({
      message: "verify",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  payment,
  paymentVerify,
};

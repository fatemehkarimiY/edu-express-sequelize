const orderService = require("./order.service");

async function createOrder(req, res, next) {
  try {
    const userId = req.user;
    const result = await orderService.create(userId);
    res.status(200).json({ message: "order created", data: result });
  } catch (err) {
    next(err);
  }
}



module.exports = {
  createOrder,
  //   getCartItems,
  //   remove
};

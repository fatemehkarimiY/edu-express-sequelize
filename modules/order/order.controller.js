const orderService = require("./order.service");

async function createOrder(req, res, next) {
  try {
  
    const result = await orderService.createOrder({ ...params, userId });
    res.status(200).json({ message: "item added", data: result });
  } catch (err) {
    next(err);
  }
}


async function getCartItems(req, res, next) {
  try {
    const userId = req.user;

    const result = await cartService.get(userId);
    res
      .status(200)
      .json({ message: "cart items get successfully", data: result });
  } catch (err) {
    next(err);
  }
}
async function remove(req, res, next) {
  try {
    const cartItemId = req.params.id;

    const result = await cartService.remove(cartItemId);
    res.status(200).json({ message: "item removed", data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
//   getCartItems,
//   remove
};

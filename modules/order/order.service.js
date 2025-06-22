const createHttpError = require("http-errors");
const User = require("../user/user.model");
const CartItem = require("../cart/cartItem.model");
const { USER_ROLE } = require("../../constants/enums");

async function createOrder(userId) {
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: Product,
  });
}

module.exports = {
  create,
};

const createHttpError = require("http-errors");
const CartItem = require("../cart/cartItem.model");
const { Order, OrderItem } = require("./order.model");
const Course = require("./../course/course.model");

async function create(userId) {
  // const hasActiveOrder = await Order.findOne({
  //   where: { userId, expiredIn: { [Op.gt]: new Date() } },
  // });
  // if(hasActiveOrder){
  //   throw createHttpError.Conflict()
  // }
  // const cartItems = await CartItem.findAll({
  //   where: { userId },
  //   include: {
  //     model: Course,
  //     as: "course",
  //   },
  // });

  // if (cartItems.length === 0) throw createHttpError.NotFound("Cart is empty");
  // let finalAmount = 0;
  // let totalAmount = 0;
  // let discountAmount = 0;
  // cartItems.forEach((item) => {
  //   //todo add finalprice and total price to product
  //   finalAmount += item.course?.finalAmount ?? 0;
  //   totalAmount += item.course?.totalAmount ?? 0;
  //   discountAmount += item.course?.discountAmount ?? 0;
  // });

  // const order = await Order.create({
  //   userId,
  //   totalAmount,
  //   finalAmount,
  //   discountAmount,
  //   expiredIn: new Date(Date.now() + 8 * 60 * 1000),
  // });

  // const orderItems = cartItems.map((item) => {
  //   return {
  //     courseId: item.course.id,
  //     orderId: order.id,
  //   };
  // });

  // await OrderItem.bulkCreate(orderItems);
  
  // return order;
}

module.exports = {
  create,
};

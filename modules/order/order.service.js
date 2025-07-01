const createHttpError = require("http-errors");
const { Order, OrderItem } = require("./order.model");
const Course = require("./../course/course.model");

async function getUserOrders(userId) {
  const orders = await Order.findAll({ where: { userId } });
  return orders;
}

module.exports = {
  getUserOrders,

};

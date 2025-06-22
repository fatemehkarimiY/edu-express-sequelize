const createHttpError = require("http-errors");
const CartItem = require("./cartItem.model");
const Course = require("./../course/course.model");

async function add(params) {
  const { userId, courseId, totalAmount, finalAmount, discountAmount } = params;

  const isExist = await CartItem.findOne({ where: { userId, courseId } });

  if (isExist) {
    throw createHttpError.Conflict("Item exist");
  }

  const course = await Course.findByPk(courseId);
  if (!course) {
    throw createHttpError.NotFound("course not exist");
  }

  const cartItem = await CartItem.create({
    userId,
    courseId,
  });
  if (totalAmount) {
    cartItem.totalAmount = totalAmount;
  }
  if (finalAmount) {
    cartItem.finalAmount = finalAmount;
  }
  if (discountAmount) {
    cartItem.discountAmount = discountAmount;
  }
  await cartItem.save();
  return cartItem;
}
async function remove(params) {
  const id = params;

  const cartItem = await CartItem.findByPk(id);

  if (!cartItem) {
    throw createHttpError.NotFound("cart item not found");
  }

  const result = await cartItem.destroy()
  
  return result

}
async function get(userId) {
  const carts = await CartItem.findAll({
    where: { userId },
    include: Course,
  });

  return carts;
}

module.exports = {
  add,
  get,
  remove
};

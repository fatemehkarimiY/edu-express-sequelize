const User = require("../modules/user/user.model");
const Otp = require("../modules/user/otp.model");
const sequelize = require("./sequelize");
const Profile = require("../modules/profile/profile.model");
const RefreshToken = require("../modules/user/refreshToken.model");
const Course = require("../modules/course/course.model");
const Enrollment = require("../modules/enrollment/enrollment.model");
const Session = require("../modules/session/session.model");
const Attendance = require("../modules/attendance/attendance.model");
const { Order, OrderItem } = require("../modules/order/order.model");
const Payment = require("../modules/payment/payment.model");
const CartItem = require("../modules/cart/cartItem.model");
async function initModels() {
  User.initModel(sequelize);
  Course.initModel(sequelize);
  Otp.initModel(sequelize);
  Profile.initModel(sequelize);
  RefreshToken.initModel(sequelize);
  Enrollment.initModel(sequelize);
  Session.initModel(sequelize);
  Attendance.initModel(sequelize);
  Order.initModel(sequelize);
  OrderItem.initModel(sequelize);
  CartItem.initModel(sequelize);
  Payment.initModel(sequelize);

  // #region user relationships
  // otp
  User.hasMany(Otp, {
    foreignKey: "userId",
    as: "user_otp",
    sourceKey: "id",
  });

  Otp.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });

  // profile
  User.hasOne(Profile, {
    foreignKey: "userId",
    as: "profile",
  });

  Profile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // token
  User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refresh_token",
    sourceKey: "id",
  });
  RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  // #endregion user relationships

  // #region course relationships
  Course.belongsTo(User, {
    foreignKey: "teacherId",
    as: "teacher",
  });
  User.hasMany(Course, {
    foreignKey: "teacherId",
    as: "courses",
  });
  // #endregion course relationships

  // #region enrollment
  Enrollment.belongsTo(User, {
    foreignKey: "studentId",
    as: "user",
  });
  Enrollment.belongsTo(Course, {
    foreignKey: "courseId",
    as: "course",
  });

  User.hasMany(Enrollment, {
    foreignKey: "studentId",
    as: "enrollment",
  });
  Course.hasMany(Enrollment, {
    foreignKey: "courseId",
    as: "enrollment",
  });

  Session.belongsTo(Course, {
    foreignKey: "courseId",
  });

  Course.hasMany(Session, {
    foreignKey: "courseId",
  });

  // #endregion enrollment
  Attendance.belongsTo(User, {
    foreignKey: "studentId",
    targetKey: "id",
    as: "user",
  });
  User.hasMany(Attendance, {
    foreignKey: "studentId",
    as: "attendance",
    sourceKey: "id",
  });

  Session.hasMany(Attendance, {
    foreignKey: "sessionId",
    as: "attendance",
  });
  Attendance.belongsTo(Session, {
    foreignKey: "sessionId",
    as: "session",
  });

  // #region order
  Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
  });
  User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders",
  });
  OrderItem.hasOne(Course, {
    foreignKey: "courseId",
    as: "course",
  });
  Order.hasOne(Payment, {
    foreignKey: "orderId",
    as: "payment",
  });
  Payment.hasOne(Payment, {
    foreignKey: "paymentId",
    as: "order",
  });
  OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
  });

  // cart

  User.hasMany(CartItem, {
    as: "cartItems",
    foreignKey: "userId",
  });

  CartItem.belongsTo(Course, {
    foreignKey: "courseId",
    as: "course",
  });

  CartItem.belongsTo(User, {
    foreignKey: "userId",
  });

  await sequelize.sync({ alter: true });
}

module.exports = { initModels };

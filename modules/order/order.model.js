const { Model, DataTypes } = require("sequelize");
const { ORDER_STATUS } = require("../../constants/enums");

class Order extends Model {
  static initModel(sequelize) {
    return Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        paymentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL,
        },
        finalAmount: {
          type: DataTypes.DECIMAL,
        },
        discountAmount: {
          type: DataTypes.DECIMAL,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(ORDER_STATUS)),
          allowNull: false,
          defaultValue: ORDER_STATUS.PENDING,
        },
      },
      {
        modelName: "Order",
        tableName: "Order",
        sequelize,
        underscored: true,
      }
    );
  }
}

class OrderItem extends Model {
  static initModel(sequelize) {
    return OrderItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "OrderItem",
        tableName: "order_item",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = { Order, OrderItem };

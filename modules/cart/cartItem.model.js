const { Model, DataTypes } = require("sequelize");

class CartItem extends Model {
  static initModel(sequelize) {
    return CartItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL,
          defaultValue: 0,
        },
        finalAmount: {
          type: DataTypes.DECIMAL,
          defaultValue: 0,
        },
        discountAmount: {
          type: DataTypes.DECIMAL,
          defaultValue: 0,
        },
      },
      {
        modelName: "CartItem",
        tableName: "cart_item",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = CartItem;

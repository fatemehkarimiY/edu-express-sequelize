const { Model, DataTypes } = require("sequelize");
const { PAYMENT_STATUS } = require("../../constants/enums");

class Payment extends Model {
  static initModel(sequelize) {
    return Payment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        refId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        amount: {
          type: DataTypes.DECIMAL,
        },
        authority: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        
        status: {
          type: DataTypes.ENUM(...Object.values(PAYMENT_STATUS)),
          allowNull: false,
          defaultValue: PAYMENT_STATUS.PENDING,
        },
      },
      {
        modelName: "Payment",
        tableName: "payment",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = Payment;

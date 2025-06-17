const { Model, DataTypes } = require("sequelize");

class Otp extends Model {
  static initModel(sequelize) {
    return Otp.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        modelName: "Otp",
        tableName: "user_otp",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = Otp;

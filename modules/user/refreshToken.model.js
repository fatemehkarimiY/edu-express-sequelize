const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {
  static initModel(sequelize) {
    return RefreshToken.init(
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
        token: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ipAddress: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        deviceInfo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: "RefreshToken",
        tableName: "refresh_token",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = RefreshToken;

const { Model, DataTypes } = require("sequelize");
const { USER_ROLE } = require("../../constants/enums");

class User extends Model {
  static initModel(sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        mobile: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        otpId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(USER_ROLE)),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "user",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = User;

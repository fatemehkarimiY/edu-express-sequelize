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
          defaultValue: USER_ROLE.USER,
          allowNull: false,
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
        defaultScope: { attributes: { exclude: ["createdAt", "updatedAt"] } },
      }
    );
  }
}

module.exports = User;

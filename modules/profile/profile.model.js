const { Model, DataTypes } = require("sequelize");
const { GENDER_ENUM } = require("../../constants/enums");

class Profile extends Model {
  static initModel(sequelize) {
    return Profile.init(
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
        fullname: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },

        latitude: {
          type: DataTypes.DECIMAL(10, 7),
          allowNull: true,
        },
        longitude: {
          type: DataTypes.DECIMAL(10, 7),
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM(...Object.values(GENDER_ENUM)),
          allowNull: true,
        },
      },
      {
        modelName: "Profile",
        tableName: "profile",
        sequelize,

        underscored: true,
        defaultScope: {
          attributes: { exclude: ["createdAt", "updatedAt", "id", "userId"] },
          include: [
            {
              model: sequelize.models.User,
              as: "user",
              attributes: ["mobile", "role"],
            },
          ],
        },
      }
    );
  }
}

module.exports = Profile;

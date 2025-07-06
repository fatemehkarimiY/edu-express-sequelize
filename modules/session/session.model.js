const { Model, DataTypes } = require("sequelize");
const { SESSION_STATUS } = require("../../constants/enums");

class Session extends Model {
  static initModel(sequelize) {
    return Session.init(
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
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(SESSION_STATUS)),
          defaultValue: SESSION_STATUS.DRAFT,
        },
      },
      {
        modelName: "Session",
        tableName: "session",
        sequelize,
        underscored: true,
        defaultScope: {
          attributes: { exclude: ["created_at", "updated_at"] },
        },
      }
    );
  }
}

module.exports = Session;

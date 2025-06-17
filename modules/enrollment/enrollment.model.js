const { Model, DataTypes } = require("sequelize");
const { ENROLLMENT_STATUS } = require("../../constants/enums");

class Enrollment extends Model {
  static initModel(sequelize) {
    return Enrollment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(ENROLLMENT_STATUS)),
          allowNull: false,
          defaultValue: ENROLLMENT_STATUS.PENDING,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
      },

      {
        modelName: "Enrollment",
        tableName: "enrollment",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = Enrollment;

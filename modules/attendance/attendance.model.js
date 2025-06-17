const { Model, DataTypes } = require("sequelize");
const { ABSENCE_TYPES, ATTENDANCE_TYPES } = require("../../constants/enums");

class Attendance extends Model {
  static initModel(sequelize) {
    return Attendance.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sessionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        studentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        attendanceType: {
          type: DataTypes.ENUM(...Object.values(ATTENDANCE_TYPES)),
          defaultValue: ATTENDANCE_TYPES.PRESENT,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        absenceType: {
          type: DataTypes.ENUM(...Object.values(ABSENCE_TYPES)),
          allowNull: true,
        },
      },
      {
        modelName: "Attendance",
        tableName: "attendance",
        sequelize,
        underscored: true,
      }
    );
  }
}

module.exports = Attendance;

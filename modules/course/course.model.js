const { Model, DataTypes } = require("sequelize");
const { COURSE_STATUS } = require("../../constants/enums");

class Course extends Model {
  static initModel(sequelize) {
    return Course.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        payablePrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(COURSE_STATUS)),
          allowNull: false,
          defaultValue: COURSE_STATUS.DRAFT,
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "Course",
        tableName: "course",
        sequelize,
        underscored: true,
        defaultScope: {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      }
    );
  }
}

module.exports = Course;

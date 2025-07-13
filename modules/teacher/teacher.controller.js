const { exportData } = require("../../utils/exportData");
const teacherService = require("./teacher.service");
const exceljs = require("exceljs");

async function getList(req, res, next) {
  try {
    const teachers = await teacherService.getList(req.query);
    res.status(200).json({
      message: "success",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
}

async function getPopularTeacher(req, res, next) {
  try {
    const teachers = await teacherService.getPopularTeacher(req.query);
    res.status(200).json({
      message: "success",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
}

async function getExcel(req, res, next) {
  try {
    const teachers = await teacherService.getList(req.query);

    const columns = [
      { header: "#", key: "id", width: 15 },
      { header: "Mobile", key: "mobile", width: 20 },
      { header: "Full Name", key: "fullname", width: 25 },
      { header: "Gender", key: "gender", width: 15 },
    ];

    const flattenedData = teachers.map((teacher) => ({
      id: teacher.id,
      mobile: teacher.mobile,
      fullname: teacher.profile ? teacher.profile.fullname : "",
      gender: teacher.profile ? teacher.profile.gender : "",
    }));

    const workbook = exportData(flattenedData, "Teachers List", columns);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=teachers-list.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getList, getPopularTeacher, getExcel };

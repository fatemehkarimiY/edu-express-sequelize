const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("./../package.json");
const {
  sendOtpSwaggerSchema,
  verifyOtpSwaggerSchema,
  refreshTokenSwaggerSchema,
} = require("../modules/auth/auth.validation");
const {
  createCourseSwaggerSchema,
  updateCourseSwaggerSchema,
} = require("../modules/course/course.validation");
const {
  createEnrollmentSwaggerSchema,
  getEnrollmentSwaggerSchema,
} = require("../modules/enrollment/enrollment.validation");
const {
  createSessionSwaggerSchema,
  updateSessionSwaggerSchema
} = require("../modules/session/session.validation");
const {
  updateProfileSwaggerSchema,
} = require("../modules/profile/profile.validation");
const { assignRoleSwaggerSchema } = require("../modules/role/role.validation");
const {
  verifyPaymentSwaggerSchema,
} = require("../modules/payment/payment.validation");
const { createAttendanceSwaggerSchema, updateAttendanceSwaggerSchema } = require("../modules/attendance/attendance.validation");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version,
      description: "description",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        sendOtp: sendOtpSwaggerSchema,
        verifyOtp: verifyOtpSwaggerSchema,
        refreshToken: refreshTokenSwaggerSchema,
        createCourse: createCourseSwaggerSchema,
        updateCourse: updateCourseSwaggerSchema,
        createAttendance: createAttendanceSwaggerSchema,
        updateAttendance: updateAttendanceSwaggerSchema,
        createEnrollment: createEnrollmentSwaggerSchema,
        createSession: createSessionSwaggerSchema,
        updateSession: updateSessionSwaggerSchema,
        updateProfile: updateProfileSwaggerSchema,
        assignRole: assignRoleSwaggerSchema,
        verifyPayment: verifyPaymentSwaggerSchema,
        getEnrollment:getEnrollmentSwaggerSchema
      },
    },
  },

  apis: ["modules/**/*.swagger.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerConfig(app) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerConfig;

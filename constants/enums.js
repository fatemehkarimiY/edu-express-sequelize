const USER_ROLE = {
  ADMIN: "admin",
  STUDENT: "student",
  TEACHER: "teacher",
  USER: "user",
};

const PAYMENT_STATUS = {
  CANCELED: "canceled",
  SUCCESSFUL: "successful",
  FAILED: "failed",
  PENDING: "pending",
};

const GENDER_ENUM = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

const ENROLLMENT_STATUS = {
  PENDING: "pending", //pending for payment
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELED: "canceled",
};

const COURSE_STATUS = {
  COMPLETED: "completed",
  COMING_SOON: "coming_soon",
  IN_PROGRESS: "in_progress",
  DRAFT: "draft",
  ARCHIVED: "archived",
};

const SESSION_STATUS = {
  FINISHED: "finished",
  IN_PROGRESS: "in_progress",
  DRAFT: "draft",
  CANCELED: "canceled",
  NOT_FORMED: "not_formed", //تشکیل نشد
};

const ABSENCE_TYPES = {
  EXCUSED: "excused",
  UNEXCUSED: "unexcused",
};
const ATTENDANCE_TYPES = {
  DELAY: "delay",
  ABSENT: "absent",
  PRESENT: "present",
};
const ORDER_STATUS = {
  PENDING: "pending",
  ORDERED: "ordered",
  IN_PROCESS: "in_process",
  COMPLETED: "completed",
  FAILED: "failed",
};

module.exports = {
  USER_ROLE,
  GENDER_ENUM,
  ENROLLMENT_STATUS,
  COURSE_STATUS,
  ABSENCE_TYPES,
  SESSION_STATUS,
  ATTENDANCE_TYPES,
  PAYMENT_STATUS,
  ORDER_STATUS,
};

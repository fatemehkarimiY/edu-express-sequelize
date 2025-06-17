const USER_ROLE = {
  ADMIN: "admin",
  STUDENT: "student",
  TEACHER: "teacher",
};

const GENDER_ENUM = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

const ENROLLMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};

const COURSE_STATUS = {
  FINISHED: "finished",
  COMING_SOON: "coming_soon",
  IN_PROGRESS: "in_progress",
  CAPACITY_COMPLETED: "capacity_completed",
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

module.exports = {
  USER_ROLE,
  GENDER_ENUM,
  ENROLLMENT_STATUS,
  COURSE_STATUS,
  ABSENCE_TYPES,
  SESSION_STATUS,
  ATTENDANCE_TYPES,
};

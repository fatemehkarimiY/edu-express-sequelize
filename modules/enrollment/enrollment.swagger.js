/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: مدیریت ثبت نام ها

 * /enrollment:
 *   post:
 *     summary: ایجاد ثبت نام جدید
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createEnrollment'
 *     responses:
 *       201:
 *         description: ثبت نام با موفقیت ایجاد شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز

*/
/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: 

 * /enrollment:
 *   get:
 *     summary: 
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     params:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/getEnrollment'
 *     responses:
 *       201:
 *         description: ثبت نام با موفقیت ایجاد شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز

*/
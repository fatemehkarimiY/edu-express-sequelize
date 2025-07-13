/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: 

 * /teacher:
 *   get:
 *     summary:
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *         description: to search in fullName
 *       - in: query
 *         name: mobile
 *         type: string
 *       - in: query
 *         name: gender
 *         type: string
 *         enum: [male, female]  #  GENDER_STATUS
 *     responses:
 *       200:
 *         description: success
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
 *   name: Teacher
 *   description: 

 * /teacher/excel:
 *   get:
 *     summary:
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         type: string
 *         description: to search in fullName
 *       - in: query
 *         name: mobile
 *         type: string
 *       - in: query
 *         name: gender
 *         type: string
 *         enum: [male, female]  #  GENDER_STATUS
 *     responses:
 *       200:
 *         description: success
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
 *   name: Teacher
 *   description: 

 * /teacher/popular:
 *   get:
 *     summary:
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 */

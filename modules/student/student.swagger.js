/**
 * @swagger
 * tags:
 *   name: Student
 *   description: 

 * /student:
 *   get:
 *     summary:
 *     tags: [Student]
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
 *         name: courseId
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

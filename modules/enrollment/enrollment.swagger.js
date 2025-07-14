/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: 

 * /enrollment:
 *   post:
 *     summary:  
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

 * /enrollment:
 *   get:
 *     summary: 
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed, canceled]  #  ENROLLMENT_STATUS
 *         description: 
 *     responses:
 *       200:
 *         description: اطلاعات با موفقیت دریافت شد
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
 *
 * /enrollment/{id}/cancel:
 *   put:
 *      summary:
 *      tags:
 *          -   Enrollment
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description:
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /enrollment/enrolled-students:
 *   get:
 *     summary:
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed, canceled]  #  ENROLLMENT_STATUS
 *     responses:
 *       200:
 *         description: اطلاعات با موفقیت دریافت شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 */

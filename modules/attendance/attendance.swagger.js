/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: 

 * /attendance:
 *   post:
 *     summary:  
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createAttendance'
 *     responses:
 *       201:
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
 *   name: Attendance
 *   description: 

 * /attendance/{id}:
 *   put:
 *     summary:  
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateAttendance'
 *     responses:
 *       201:
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
 *   name: Attendance
 *   description: 

 * /attendance:
 *   get:
 *     summary: 
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: attendanceType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [delay, absent, present]  #  ATTENDANCE_TYPES
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
 * /attendance/{id}:
 *  delete:
 *      summary:
 *      tags:
 *          -   Attendance
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

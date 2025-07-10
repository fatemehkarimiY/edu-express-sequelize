/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Course
 *     description:
 *
 * /course:
 *   post:
 *     summary:
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createCourse'
 *     responses:
 *       201:
 *         description: دوره با موفقیت ایجاد شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 *
 * /course/{id}:
 *   put:
 *     summary:
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description:
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateCourse'
 *     responses:
 *       200:
 *         description: دوره با موفقیت ویرایش شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 *       404:
 *         description: دوره پیدا نشد
 *
 *   delete:
 *     summary:
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: دوره حذف شد
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 *       404:
 *         description: دوره پیدا نشد
 *   get:
 *     summary:
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: success
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 *       404:
 *         description: دوره پیدا نشد
 */

/**
 * @swagger
 * /course:
 *  get:
 *      summary:
 *      tags:
 *          -   Course
 *      security:
 *       - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /course/{courseId}/sessions:
 *  get:
 *      summary:
 *      tags:
 *          -   Course
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - name: courseId
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
 * /course/{courseId}/students:
 *  get:
 *      summary:
 *      tags:
 *          -   Course
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description:
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: success
 */

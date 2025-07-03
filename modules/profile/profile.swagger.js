/**
 * @swagger
 *   tags:
 *   name: Profile
 *   description:
 * /profile:
 *  get:
 *      summary:
 *      tags:
 *          -   Profile
 *      security:
 *       - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: 
 * /profile:
 *   put:
 *     summary: 
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateProfile'
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

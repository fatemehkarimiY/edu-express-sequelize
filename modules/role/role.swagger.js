/**
 * @swagger
 * tags:
 *   name: Role
 *   description: 

 * /role:
 *   put:
 *     summary:
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/assignRole'
 *     responses:
 *       201:
 *         description: نقش با موفقیت اعمال شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز

*/

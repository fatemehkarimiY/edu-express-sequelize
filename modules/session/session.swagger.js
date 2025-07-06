/**
 * @swagger
 * tags:
 *   name: Session
 * /session:
 *   post:
 *     summary: 
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createSession'
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
 *   name: Session
 * /session/{id}:
 *   put:
 *     summary: 
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description:   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateSession'
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
 *   name: Session
 * /session/{id}:
 *   get:
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *   name: Session
 * /session/{id}:
 *   delete:
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: جلسه با موفقیت حذف شد
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
 *   name: Session
 * /session:
 *   get:
 *     tags: [Session]
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

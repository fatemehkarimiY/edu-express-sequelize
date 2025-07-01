/**
 * @swagger
 * tags:
 *   name: Session
 * /session:
 *   post:
 *     summary: ایجاد جلسه جدید
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
 *         description: جلسه با موفقیت ایجاد شد
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
 *         description: شناسه دوره  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateSession'
 *     responses:
 *       200:
 *         description: جلسه با موفقیت ویرایش شد
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
 *         description: جلسه با موفقیت دریافت شد
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

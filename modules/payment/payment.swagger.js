/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: 

 * /payment:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: به صفحه پرداخت منقل شدید
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
 *   name: Payment
 *   description: 

 * /payment/verify:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verifyPayment'
 *     responses:
 *       200:
 *         description: پرداخت تایید شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز

*/

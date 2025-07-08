

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "1"
 *               password:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       200:
 *         description: ورود موفق
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendOtp'
 *     responses:
 *       200:
 *         description: کد تایید ارسال شد
 */

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/verifyOtp'
 *     responses:
 *       200:
 *         description: success
 */

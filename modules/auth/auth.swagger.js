

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ورود کاربر با موبایل و رمز عبور
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
 *                 example: "09123456789"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: ورود موفق
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: ارسال کد تایید به موبایل
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
 *     summary: تایید کد OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/verifyOtp'
 *     responses:
 *       200:
 *         description: تایید موفق
 */

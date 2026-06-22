/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Login user
 *     description: Authenticate user and return access and refresh tokens.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Register new user
 *     description: Create a new user account.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *
 *     responses:
 *
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Request password reset
 *     description: Send password reset email.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *
 *     responses:
 *
 *       200:
 *         description: Reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericMessageResponse'
 *
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Reset user password
 *     description: Update password using a valid reset token.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *
 *     responses:
 *
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericMessageResponse'
 *
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Refresh access token
 *     description: Generate new access and refresh tokens.
 *
 *     responses:
 *
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *
 *     summary: Logout user
 *     description: Logout authenticated user and invalidate session.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericMessageResponse'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

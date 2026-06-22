/**
 * @swagger
 * components:
 *   schemas:
 *
 *     LoginRequest:
 *       type: object
 *       description: Payload used to authenticate a user.
 *       required:
 *         - email
 *         - password
 *
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: omar@test.com
 *
 *         password:
 *           type: string
 *           example: Password123
 *
 *     TokenResponse:
 *       type: object
 *       description: JWT tokens returned after authentication.
 *
 *       properties:
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1Ni...
 *
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1Ni...
 *
 *     LoginResponse:
 *       type: object
 *       description: Successful login response.
 *
 *       example:
 *         message: LOGIN_SUCCESS
 *         data:
 *           accessToken: eyJhbGciOiJIUzI1Ni...
 *           refreshToken: eyJhbGciOiJIUzI1Ni...
 *
 *       properties:
 *         message:
 *           type: string
 *           example: LOGIN_SUCCESS
 *
 *         data:
 *           $ref: '#/components/schemas/TokenResponse'
 *
 *     RegisterRequest:
 *       type: object
 *       description: Payload used to create a new user.
 *
 *       required:
 *         - email
 *         - password
 *         - name
 *         - lastName
 *
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: omar@test.com
 *
 *         password:
 *           type: string
 *           example: Password123
 *
 *         name:
 *           type: string
 *           example: Omar
 *
 *         lastName:
 *           type: string
 *           example: Vargas
 *
 *     RegisterResponse:
 *       type: object
 *       description: Successful user creation response.
 *
 *       example:
 *         message: USER_CREATED
 *         data: null
 *
 *       properties:
 *         message:
 *           type: string
 *           example: USER_CREATED
 *
 *         data:
 *           nullable: true
 *           example: null
 *
 *     ForgotPasswordRequest:
 *       type: object
 *       description: Request password reset email.
 *
 *       required:
 *         - email
 *
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: omar@test.com
 *
 *     ResetPasswordRequest:
 *       type: object
 *       description: Reset password using reset token.
 *
 *       required:
 *         - token
 *         - password
 *
 *       properties:
 *         token:
 *           type: string
 *           example: reset-token
 *
 *         password:
 *           type: string
 *           example: NewPassword123
 *
 *     RefreshTokenResponse:
 *       type: object
 *       description: Successful refresh token response.
 *
 *       example:
 *         message: TOKENS_REFRESHED
 *         data:
 *           accessToken: eyJhbGciOiJIUzI1Ni...
 *           refreshToken: eyJhbGciOiJIUzI1Ni...
 *
 *       properties:
 *         message:
 *           type: string
 *           example: TOKENS_REFRESHED
 *
 *         data:
 *           $ref: '#/components/schemas/TokenResponse'
 *
 *     LogoutResponse:
 *       type: object
 *       description: Successful logout response.
 *
 *       example:
 *         message: LOGOUT_SUCCESS
 *         data: null
 *
 *       properties:
 *         message:
 *           type: string
 *           example: LOGOUT_SUCCESS
 *
 *         data:
 *           nullable: true
 *           example: null
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     ProfileData:
 *       type: object
 *       description: User profile information.
 *
 *       example:
 *         id: 123
 *         email: test@gmail.com
 *         firstName: Pedro
 *         lastName: Perez
 *         avatarUrl: null
 *
 *       required:
 *         - id
 *         - email
 *         - firstName
 *         - lastName
 *
 *       properties:
 *
 *         id:
 *           type: integer
 *           example: 123
 *
 *         email:
 *           type: string
 *           format: email
 *           example: test@gmail.com
 *
 *         firstName:
 *           type: string
 *           example: Pedro
 *
 *         lastName:
 *           type: string
 *           example: Perez
 *
 *         avatarUrl:
 *           type: string
 *           nullable: true
 *           example: null
 *
 *     MeResponse:
 *       type: object
 *       description: Profile fetched successfully.
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: GET_PROFILE
 *
 *         data:
 *           $ref: '#/components/schemas/ProfileData'
 *
 *     UpdateProfileRequest:
 *       type: object
 *       description: Payload used to update user profile information.
 *
 *       required:
 *         - firstName
 *         - lastName
 *
 *       properties:
 *
 *         firstName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: Pepito
 *
 *         lastName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: Perez
 *
 *     UpdateProfileResponse:
 *       type: object
 *       description: Profile updated successfully.
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: PATCH_PROFILE
 *
 *         data:
 *           $ref: '#/components/schemas/ProfileData'
 *
 *     UpdateAvatarRequest:
 *       type: object
 *       description: Avatar image upload.
 *
 *       required:
 *         - avatar
 *
 *       properties:
 *
 *         avatar:
 *           type: string
 *           format: binary
 *
 *     UpdateAvatarResponse:
 *       type: object
 *       description: Avatar updated successfully.
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: PATCH_PROFILE_AVATAR
 *
 *         data:
 *           $ref: '#/components/schemas/ProfileData'
 */

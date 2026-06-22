/**
 * @swagger
 * components:
 *   schemas:
 *
 *     ErrorResponse:
 *       type: object
 *       description: Standard API error response.
 *
 *       example:
 *         message: INVALID_CREDENTIALS
 *         data: null
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: INVALID_CREDENTIALS
 *
 *         data:
 *           nullable: true
 *           example: null
 *
 *
 *     GenericMessageResponse:
 *       type: object
 *       description: Standard API response without payload.
 *
 *       example:
 *         message: OPERATION_SUCCESS
 *         data: null
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: OPERATION_SUCCESS
 *
 *         data:
 *           nullable: true
 *           example: null
 */

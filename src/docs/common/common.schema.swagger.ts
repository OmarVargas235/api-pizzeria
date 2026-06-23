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
 *         message: ERROR_CODE
 *         data: null
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: ERROR_CODE
 *
 *         data:
 *           nullable: true
 *           example: null
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

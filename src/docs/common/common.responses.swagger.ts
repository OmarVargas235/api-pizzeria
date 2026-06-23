/**
 * @swagger
 * components:
 *   responses:
 *
 *     BadRequest:
 *       description: Invalid request data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: VALIDATION_ERROR
 *             data: null
 *
 *
 *     Unauthorized:
 *       description: Authentication failed or missing authentication token.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: INVALID_TOKEN
 *             data: null
 *
 *
 *     Forbidden:
 *       description: User does not have permission to perform this action.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: FORBIDDEN_ACTION
 *             data: null
 *
 *
 *     NotFound:
 *       description: Resource not found.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: RESOURCE_NOT_FOUND
 *             data: null
 *
 *
 *     Conflict:
 *       description: Resource conflict.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: RESOURCE_CONFLICT
 *             data: null
 *
 *
 *     InternalServerError:
 *       description: Unexpected server error.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             message: INTERNAL_SERVER_ERROR
 *             data: null
 */

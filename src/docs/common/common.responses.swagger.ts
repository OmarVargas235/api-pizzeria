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
 *
 *
 *     Unauthorized:
 *       description: Authentication required or invalid credentials.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *
 *     Forbidden:
 *       description: User does not have permission to perform this action.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *
 *     NotFound:
 *       description: Resource not found.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *
 *     Conflict:
 *       description: Resource conflict.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *
 *
 *     InternalServerError:
 *       description: Unexpected server error.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /store:
 *   get:
 *     tags:
 *       - Stores
 *
 *     summary: Get stores
 *     description: Returns available stores.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of stores per page.
 *
 *     responses:
 *
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoresResponse'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     tags:
 *       - Stores
 *
 *     summary: Get store by id
 *     description: Returns store detail information.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Store unique identifier.
 *
 *     responses:
 *
 *       200:
 *         description: Store fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreByIdResponse'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

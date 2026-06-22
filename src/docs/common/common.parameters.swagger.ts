/**
 * @swagger
 * components:
 *   parameters:
 *
 *     PageParam:
 *       name: page
 *       in: query
 *       description: Page number for pagination.
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         example: 1
 *
 *
 *     LimitParam:
 *       name: limit
 *       in: query
 *       description: Maximum number of records returned.
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         example: 20
 *
 *
 *     SearchParam:
 *       name: search
 *       in: query
 *       description: Text used to filter results.
 *       required: false
 *       schema:
 *         type: string
 *         example: pizza
 *
 *
 *     SortParam:
 *       name: sort
 *       in: query
 *       description: Field used to sort results.
 *       required: false
 *       schema:
 *         type: string
 *         example: createdAt
 *
 *
 *     SortOrderParam:
 *       name: order
 *       in: query
 *       description: Sorting direction.
 *       required: false
 *       schema:
 *         type: string
 *         enum:
 *           - asc
 *           - desc
 *         example: desc
 *
 *
 *     IdParam:
 *       name: id
 *       in: path
 *       description: Resource identifier.
 *       required: true
 *       schema:
 *         type: string
 *         example: clx123abc456
 */

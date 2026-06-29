/**
 * @swagger
 * components:
 *   schemas:
 *
 *     StoreData:
 *       type: object
 *       description: Store information.
 *
 *       required:
 *         - id
 *         - name
 *         - imageUrl
 *         - address
 *
 *       properties:
 *
 *         id:
 *           type: string
 *           format: uuid
 *           example: 1a1114dd-ebdf-439b-8c57-a54e5f664063
 *
 *         name:
 *           type: string
 *           example: Pizza Store 5
 *
 *         imageUrl:
 *           type: string
 *           example: /assets/store-5.png
 *
 *         address:
 *           type: string
 *           example: Street 5
 *
 *
 *     StoresData:
 *       type: object
 *       description: Paginated list of stores.
 *
 *       properties:
 *
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StoreData'
 *
 *         total:
 *           type: integer
 *           example: 10
 *
 *
 *     PizzaData:
 *       type: object
 *       description: Pizza information.
 *
 *       required:
 *         - id
 *         - name
 *         - imageUrl
 *         - description
 *         - price
 *
 *       properties:
 *
 *         id:
 *           type: string
 *           format: uuid
 *           example: 0a16075f-e24e-445a-8ef1-d84be9b7f2fb
 *
 *         name:
 *           type: string
 *           example: Pepperoni Pizza
 *
 *         imageUrl:
 *           type: string
 *           example: /assets/pizza-1.png
 *
 *         description:
 *           type: string
 *           example: Delicious pepperoni pizza with mozzarella cheese
 *
 *         price:
 *           type: integer
 *           example: 10000
 *
 *
 *     StoreDetailData:
 *       type: object
 *       description: Store detail information.
 *
 *       required:
 *         - id
 *         - name
 *         - imageUrl
 *         - address
 *         - description
 *         - pizzas
 *
 *       properties:
 *
 *         id:
 *           type: string
 *           format: uuid
 *           example: 1a1114dd-ebdf-439b-8c57-a54e5f664063
 *
 *         name:
 *           type: string
 *           example: Pizza Store 5
 *
 *         imageUrl:
 *           type: string
 *           example: /assets/store-5.png
 *
 *         address:
 *           type: string
 *           example: Street 5
 *
 *         description:
 *           type: string
 *           example: Description for store 5
 *
 *         pizzas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PizzaData'
 *
 *
 *     StoresResponse:
 *       type: object
 *       description: Stores fetched successfully.
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: GET_STORES
 *
 *         data:
 *           $ref: '#/components/schemas/StoresData'
 *
 *
 *     StoreByIdResponse:
 *       type: object
 *       description: Store fetched successfully.
 *
 *       properties:
 *
 *         message:
 *           type: string
 *           example: GET_STORE
 *
 *         data:
 *           $ref: '#/components/schemas/StoreDetailData'
 */

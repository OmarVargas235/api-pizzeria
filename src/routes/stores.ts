import express from 'express';

// controllers
import { getStores, getStoresById } from '@controllers/stores';

// models
import { tableDetailStore, tableStores } from '@models/stores';

// middleware
import { validateToken } from '@middleware/validateToken';

const router = express.Router();

router.get('/', validateToken, tableStores, tableDetailStore, getStores);
router.get('/ById', validateToken, getStoresById);

export { router };
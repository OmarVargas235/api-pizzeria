import express from 'express';

// controllers
import { getStores, getStoresById, getStore } from '@controllers/stores';

// models
import { tableDetailStore, tableStores } from '@models/stores';

// middleware
import { validateToken } from '@middleware/validateToken';

const router = express.Router();

router.get('/', validateToken, tableDetailStore, tableStores, getStores);
router.get('/ById', validateToken, getStoresById);
router.get('/store/:id', validateToken, getStore);

export { router };
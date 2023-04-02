import express from 'express';

// controllers
import { getStores, getStoresById } from '@controllers/stores';

// models
import { tableDetailStore, tableStores } from '@models/stores';

const router = express.Router();

router.get('/', tableDetailStore, tableStores, getStores);
router.get('/ById', getStoresById);

export { router };
import express from 'express';

// controllers
import { authUser } from '@controllers/auth';

const router = express.Router();

router.post('/', authUser);

export { router };
import express from 'express';

// controllers
import { authUser, changePassword } from '@controllers/auth';

const router = express.Router();

router.post('/', authUser);
router.post('/send-email', changePassword);

export { router };
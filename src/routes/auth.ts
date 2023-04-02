import express from 'express';

// controllers
import { authUser, resetPassword } from '@controllers/auth';

const router = express.Router();

router.post('/', authUser);
router.post('/reset-password', resetPassword);

export { router };
import express from 'express';

// controllers
import { authUser, changePassword, resetPassword } from '@controllers/auth';

const router = express.Router();

router.post('/', authUser);
router.post('/send-email', changePassword);
router.put('/reset-password', resetPassword);

export { router };
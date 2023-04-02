import express from 'express';

// controllers
import { authUser, changePassword, resetPassword } from '@controllers/auth';

// models
import { tableUsers } from '@models/users';

const router = express.Router();

router.post('/', tableUsers, authUser);
router.post('/send-email', tableUsers, changePassword);
router.put('/reset-password', resetPassword);

export { router };
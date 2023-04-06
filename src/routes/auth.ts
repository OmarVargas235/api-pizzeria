import express from 'express';

// controllers
import { authUser, changePassword, resetPassword } from '@controllers/auth';

// models
import { tableUsers } from '@models/users';

// middleware
import { validateTokenURL } from '@middleware/validateToken';

const router = express.Router();

router.post('/', tableUsers, authUser);
router.post('/send-email', tableUsers, changePassword);
router.put('/reset-password', validateTokenURL, resetPassword);

export { router };
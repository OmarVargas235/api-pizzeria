import express from 'express';

// controllers
import { createUser, editUser, sessionInfo } from '@controllers/users';

// models
import { tableUsers } from '@models/users';

// middleware
import middleware from '@middleware/middleware';

const router = express.Router();

const { validateToken } = middleware.validateToken;

router.post('/', tableUsers, createUser);
router.get('/session-info', validateToken, sessionInfo);
router.put('/edit', validateToken, middleware.uploadImg.uploads.single('file'), editUser);

export { router };
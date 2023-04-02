import express from 'express';

// controllers
import { createUser, editUser } from '@controllers/users';

// models
import { tableUsers } from '@models/users';

// middleware
import middleware from '@middleware/middleware';

const router = express.Router();

router.post('/', tableUsers, createUser);
router.put('/edit', middleware.validateToken.validateToken, middleware.uploadImg.uploads.single('file'), editUser);

export { router };
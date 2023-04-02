import express from 'express';

// controllers
import { createUser, editUser } from '@controllers/users';

// models
import { tableUsers } from '@models/users';

// middleware
import { validateToken } from '@middleware/validateToken';
import { uploads } from '@middleware/uploadImg';

const router = express.Router();

router.post('/', tableUsers, createUser);
router.put('/edit', validateToken, uploads.single('file'), editUser);

export { router };
import express from 'express';

// controllers
import { createUser } from '@controllers/users';

// models
import { tableUsers } from '@models/usersDB';

const router = express.Router();

router.post('/', tableUsers, createUser);

export { router };
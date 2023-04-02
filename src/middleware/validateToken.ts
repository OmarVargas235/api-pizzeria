import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

import { httpError } from '@helpers/handleError';

export const validateToken = (req: Request, resp: Response, next: NextFunction): void => {

    const bearer = req.rawHeaders[1];
    const token = bearer.split(' ')[1] ?? '';

    try {

        jwt.verify(token, process.env.SEED ?? '');
        next();

    } catch(err) {

        httpError({ err: 'Sesión expirada', resp, status: 401 });
    }
}
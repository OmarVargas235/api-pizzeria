import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

import { httpError } from '@helpers/handleError';

export const validateToken = (req: Request, resp: Response, next: NextFunction): void => {

    const bearer = req.rawHeaders.find(v => v.includes('Bearer'));
    const token = bearer?.split(' ').pop() ?? '';

    try {

        jwt.verify(token, process.env.SEED ?? '');
        req.token = token;
        next();

    } catch(err) {

        httpError({ err: 'Sesión expirada', resp, status: 401 });
    }
}
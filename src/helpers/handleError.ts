import { type Response } from 'express';

interface Error {
    resp: Response;
    err: unknown;
    status?: 400 | 401 | 403 | 404 | 500;
}

export const httpError = ({resp, err, status=500 }: Error): void => {

    const error = err as string;

    resp.status(status).json({
        status,
        message: error.toString(),
        data: error,
    });
}
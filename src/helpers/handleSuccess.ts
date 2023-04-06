import { type Response } from 'express';

interface Success<T> {
    resp: Response;
    message: string;
    status?: 200 | 201;
    data?: T | null;
}

export const httpSuccess = <T>({resp, message, status=200, data = null }: Success<T>): void => {

    resp.status(status).json({
        status,
        message,
        data,
    });
}
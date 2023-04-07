import { type Request, type Response, type NextFunction } from 'express';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';

export const tableUsers = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    try {

        await pool.query(`
            create table if not exists users(
                name varchar(50) not null,
                lastName varchar(50) not null,
                email varchar(50) primary key not null,
                password varchar(100) not null,
                token varchar(256) DEFAULT "",
                tokenURL varchar(256) DEFAULT "",
                img varchar(200) DEFAULT null,
                idImage varchar(30) DEFAULT null
            );
        `);

        next();

    } catch (err) {

        httpError({ resp, err });
    }
}
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';
import { httpSuccess } from '@helpers/handleSuccess';
import { isEmptyObject } from '@helpers/utils';
import { type CreateUser } from '@interfaces/users';

export const createUser = async (req: Request, resp: Response): Promise<void> => {

    const body: CreateUser = req.body;
    
    try {

        const isEmpty = isEmptyObject(body, resp);
        if (isEmpty) return;

        const [users] = await pool.query(`
            select * from users where email = '${body.email}';
        `) as unknown as CreateUser[][];

        if (users.length > 0) {
            
            httpError({ resp, err: "Ya existe un usuario con este correo", status: 400 });
            return;
        }

        const hash = await bcrypt.hash(body.password, 12);
        body.password = hash;
        
        await pool.query(`
            insert into users (name, lastName, email, password) values ("${body.name}", "${body.lastName}", "${body.email}", "${body.password}");
        `);

        httpSuccess({ message: "Usuario creado", resp });

    } catch (err) {

        httpError({ resp, err });
    }
}
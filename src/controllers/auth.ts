import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';
import { isEmptyObject } from '@helpers/utils';
import { httpSuccess } from '@helpers/handleSuccess';
import { type CreateUser } from '@interfaces/users';

export const authUser = async (req: Request, resp: Response): Promise<void> => {

    const body: CreateUser = req.body;
    
    try {

        const isEmpty = isEmptyObject(body, resp);

        if (isEmpty) return;

        const [users] = await pool.query(`
            select * from users where email = '${body.email}';
        `) as unknown as CreateUser[][];

        if (users.length === 0) {
            
            httpError({ resp, err: "El usuario no existe", status: 400 });
            return;
        }

        const userBD = users[0];
        const validatePassword = await bcrypt.compare(body.password, userBD.password);
        
        if (!validatePassword) {
            
            httpError({ resp, err: "Contraseña incorrecta", status: 400 });
            return;
        }
        
        const token = jwt.sign({
            name: userBD.name,
            lastName: userBD.lastName,
            email: userBD.email,
        }, "process.env.SEED", { expiresIn: '10m' });

        httpSuccess<string>({ message: "Sesión iniciada con exito", resp, data: token });

    } catch (err) {

        httpError({ resp, err });
    }
}
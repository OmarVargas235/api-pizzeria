import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';
import { isEmptyObject, generateToken } from '@helpers/utils';
import { httpSuccess } from '@helpers/handleSuccess';
import { type CreateUser } from '@interfaces/users';
import { sendEmail } from '@config/mail';

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
        
        const token = generateToken({
            email: userBD.email,
            lastName: userBD.lastName,
            name: userBD.name,
        });

        httpSuccess<string>({ message: "Sesión iniciada con exito", resp, data: token });

    } catch (err) {

        httpError({ resp, err });
    }
}

export const resetPassword = async (req: Request, resp: Response): Promise<void> => {

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
        const token = generateToken({
            email: userBD.email,
            lastName: userBD.lastName,
            name: userBD.name,
            expire: '1h'
        });

        userBD.tokenURL = token;

        await pool.query(`
            update users set tokenURL="${token}" where email='${userBD.email}';
        `);

        const resetUrl = `${process.env.FRONTEND_URL ?? ''}/reset-password/${userBD.tokenURL}`;

		await sendEmail({
			email: userBD.email,
			subject: 'Password Reset',
			resetUrl
		});

        httpSuccess({ message: "Revisa la bandeja de tu correo", resp });

    } catch(err) {

        httpError({ resp, err });
    }
}
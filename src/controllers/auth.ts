import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

import config from '@config/config';
import helpers from '@helpers/helpers';
import { type User } from '@interfaces/users';

export const authUser = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    const { querys } = helpers.queries;
    const { generateToken, validatePassword, isEmptyObject } = helpers.utils;
    
    try {

        const isEmpty = isEmptyObject(body, resp);

        if (isEmpty) return;

        const isUser = await querys.getUsersByEmail({ email: body.email, resp });
        if (isUser) return;

        const userBD = querys.user;

        const isPassword = await validatePassword({ password: body.password, passwordBD: userBD.password, resp });

        if (isPassword) return;
        
        const token = generateToken({
            email: userBD.email,
            lastName: userBD.lastName,
            name: userBD.name,
            expire: '1h'
        });

        helpers.handleSuccess.httpSuccess({ message: "Sesión iniciada con exito", resp, data: { token, email: userBD.email } });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const changePassword = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    const { querys } = helpers.queries;
    const { generateToken, isEmptyObject } = helpers.utils;

    try {

        const isEmpty = isEmptyObject(body, resp);
        if (isEmpty) return;

        const isUser = await querys.getUsersByEmail({ email: body.email, resp });
        if (isUser) return;

        const userBD = querys.user;
        const token = generateToken({
            email: userBD.email,
            lastName: userBD.lastName,
            name: userBD.name,
            expire: '1h'
        });

        userBD.tokenURL = token;

        await config.db.pool.query(`
            update users set tokenURL="${token}" where email='${userBD.email}';
        `);

        const resetUrl = `${process.env.FRONTEND_URL ?? ''}/reset-password/${userBD.tokenURL}`;

		await config.mail.sendEmail({
			email: userBD.email,
			subject: 'Password Reset',
			resetUrl
		});

        helpers.handleSuccess.httpSuccess({ message: "Revisa la bandeja de tu correo", resp });

    } catch(err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const resetPassword = async (req: Request, resp: Response): Promise<void> => {

    const body: Pick<User, "password" | "email"> = req.body;
    const { querys } = helpers.queries;
    const { isEmptyObject } = helpers.utils;

    try {

        const isEmpty = isEmptyObject(body, resp);
        if (isEmpty) return;

        if (isEmpty) return;

        const isUser = await querys.getUsersByEmail({ email: body.email, resp });
        if (isUser) return;

        const userBD = querys.user;
        const hash = await bcrypt.hash(body.password, 12);
        body.password = hash;

        await config.db.pool.query(`
            update users set password="${body.password}" where email='${userBD.email}';
        `);

        helpers.handleSuccess.httpSuccess({ message: "Password actualizado correctamente", resp });

    } catch(err) {

        helpers.handleError.httpError({ resp, err });
    }
}
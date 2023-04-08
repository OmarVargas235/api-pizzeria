import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '@config/db';
import helpers from '@helpers/helpers';
import { type User } from '@interfaces/users';
import middleware from '@middleware/middleware';
import fs from 'fs';

export const createUser = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    const { querys } = helpers.queries;
    const { isEmptyObject } = helpers.utils;
    
    try {

        const isEmpty = isEmptyObject(body, resp);
        if (isEmpty) return;

        const isUser = await querys.getUsersByEmail({ email: body.email, resp, message: 'Ya existe un usuario con este correo', isChangeCondition: true });
        if (isUser) return;

        const hash = await bcrypt.hash(body.password, 12);
        body.password = hash;
        
        await pool.query(`
            insert into users (name, lastName, email, password) values ("${body.name}", "${body.lastName}", "${body.email}", "${body.password}");
        `);

        helpers.handleSuccess.httpSuccess({ message: "Usuario creado", resp });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const sessionInfo = async (req: Request, resp: Response): Promise<void> => {

    try {
        
        const [users] = await pool.query(`
            select * from users where token = '${req.token}';
        `) as unknown as User[][];

        const [user] = users;

        if (user === undefined) {

            helpers.handleError.httpError({ resp, err: 'Sesión expirada', status: 401 });
            return;
        }

        const { password, tokenURL, token, ...obj } = user;

        helpers.handleSuccess.httpSuccess({ message: "", resp, data: obj });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const editUser = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    const { file } = req;

    const { querys } = helpers.queries;
    const { saveCloudinary, deleteCloudinary } = helpers.utils;
    
    try {

        const isUser = await querys.getUsersByEmail({ email: body.email, resp });
        if (isUser) return;

        const userBD = querys.user;

        (userBD.idImage.length > 0 && file !== undefined) && await deleteCloudinary(userBD.idImage);

        const image = file !== undefined
            ? await middleware.uploadImg.helperImg(file?.path ?? '', `resize-${file?.filename ?? ''}`, 200)
            : userBD.img;

        const imageCloudinary:{ id: string; url: string; } = file !== undefined ? await saveCloudinary(image) : { id: userBD.idImage, url: userBD.img };

        const name = body.name ?? userBD.name;
        const lastName = body.lastName ?? userBD.lastName;
        const img: string = imageCloudinary.url;
        const idImage: string = imageCloudinary.id;

        await pool.query(`
            update users set name="${name}", lastName="${lastName}", img="${img}", idImage="${idImage}" where email='${userBD.email}';
        `);

        if (userBD.idImage.length > 0 && file !== undefined) {

            fs.unlinkSync(`./public/optimize/resize-${file?.filename ?? ''}`);
            fs.unlinkSync(`./public/uploads/${file?.filename ?? ''}`);
        }

        helpers.handleSuccess.httpSuccess({ message: "Usuario editado con exito", resp });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';
import { httpSuccess } from '@helpers/handleSuccess';
import { isEmptyObject } from '@helpers/utils';
import { type User } from '@interfaces/users';
import { helperImg } from '@middleware/uploadImg';

export const createUser = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    
    try {

        const isEmpty = isEmptyObject(body, resp);
        if (isEmpty) return;

        const [users] = await pool.query(`
            select * from users where email = '${body.email}';
        `) as unknown as User[][];

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

export const editUser = async (req: Request, resp: Response): Promise<void> => {

    const body: User = req.body;
    const { file } = req;
    
    try {
        
        const image = file !== undefined
            ? await helperImg(file?.path ?? '', `resize-${file?.filename ?? ''}`, 200)
            : null;

        const [users] = await pool.query(`
            select * from users where email = "${body.email}";
        `) as unknown as User[][];

        if (users.length === 0) {
            
            httpError({ resp, err: "No existe el usuario", status: 400 });
            return;
        }

        const userBD = users[0];
        const name = body.name ?? userBD.name;
        const lastName = body.lastName ?? userBD.lastName;
        const img: string = image as string;

        await pool.query(`
            update users set name="${name}", lastName="${lastName}", img="${img}" where email='${userBD.email}';
        `);

        httpSuccess({ message: "Usuario editado con exito", resp });

    } catch (err) {

        httpError({ resp, err });
    }
}
import { type Request, type Response } from 'express';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';
import { httpSuccess } from '@helpers/handleSuccess';
import { type Stores } from '@interfaces/stores';

export const getStores = async (req: Request, resp: Response): Promise<void> => {

    try {

        const [stores] = await pool.query(`
            select * from stores;
        `) as unknown as Stores[][];

        httpSuccess({ message: "", resp, data: stores });

    } catch (err) {

        httpError({ resp, err });
    }
}

export const getStoresById = async (req: Request, resp: Response): Promise<void> => {

    const id: number = Number(req.query.id) ?? -1;

    try {

        const [stores] = await pool.query(`
            select * from stores where id = ${id};
        `) as unknown as Stores[][];

        const [store] = stores;
        httpSuccess({ message: "", resp, data: store });

    } catch (err) {

        httpError({ resp, err });
    }
}
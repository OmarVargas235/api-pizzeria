import { type Request, type Response } from 'express';
import { pool } from '@config/db';
import helpers from '@helpers/helpers';
import { type Stores, type StoresAndDetailStore } from '@interfaces/stores';

export const getStores = async (req: Request, resp: Response): Promise<void> => {

    try {

        const [stores] = await pool.query(`
            select * from stores;
        `) as unknown as Stores[][];

        helpers.handleSuccess.httpSuccess({ message: "", resp, data: stores });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const getStoresById = async (req: Request, resp: Response): Promise<void> => {

    const id: number = Number(req.query.id) ?? -1;

    try {

        const [stores] = await pool.query(`
            select * from stores where id = ${id};
        `) as unknown as Stores[][];

        const [store] = stores;
        helpers.handleSuccess.httpSuccess({ message: "", resp, data: store });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}

export const getStore = async (req: Request, resp: Response): Promise<void> => {

    const id: number = Number(req.params.id) ?? -1;

    try {

        const [stores] = await pool.query(`
            select * from stores s inner join detailstore ds on s.idDetail = ds.id
            where s.idDetail = ${id};
        `) as unknown as StoresAndDetailStore[][];

        helpers.handleSuccess.httpSuccess({ message: "", resp, data: stores });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}
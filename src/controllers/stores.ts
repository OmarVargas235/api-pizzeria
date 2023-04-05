import { type Request, type Response } from 'express';
import { pool } from '@config/db';
import helpers from '@helpers/helpers';
import { type Paginate, type DetailStore, type Stores } from '@interfaces/stores';

export const getStores = async (req: Request, resp: Response): Promise<void> => {

    const { page, rowsPerPage } = req.query as unknown as Paginate;
    const limit = rowsPerPage ?? 3;
    const offset = page ?? 0;

    try {

        const [stores] = await pool.query(`
            select * from stores limit ${Math.abs(limit)} offset ${Math.abs(offset)};
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
            select s.logo, s.title, s.descriptionStores, s.direction, s.id, ds.img, ds.descriptionPizza, ds.id
            from stores s inner join detailstore ds on s.id = ds.idStore
            where s.id = ${id};
        `) as unknown as DetailStore[][];

        const [store] = stores;
        const detail = {
            pizzeria: {
                logo: store.logo,
                title: store.title,
                description: store.descriptionStores,
                direction: store.direction,
            },
            pizzerias: stores.map(v => ({ id: v.id, img: v.img, description: v.descriptionPizza })) 
        }

        helpers.handleSuccess.httpSuccess({ message: "", resp, data: detail });

    } catch (err) {

        helpers.handleError.httpError({ resp, err });
    }
}
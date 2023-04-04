import { type Request, type Response, type NextFunction } from 'express';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';

export const tableDetailStore = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    try {

        await pool.query(`
            create table if not exists detailStore(
                img varchar(30),
                descriptionPizza varchar(30),
                id int primary key auto_increment
            );
        `);

        const [stores] = await pool.query(`
            select * from detailStore;
        `) as unknown[][];

        if (stores.length > 0) {

            next();
            return;
        }

        await pool.query(`
            insert into detailStore (img, descriptionPizza) values
                ("pollo.png", "Pizza de Pollo"),
                ("pollo&champiñones.png", "Pizza de Pollo y Champiñones"),
                ("vegetales.png", "Pizza de Vegetales"),
                ("vegetales&atun.png", "Pizza de Vegetales y Atun"),
                ("queso&champiñones.png", "Pizza 3 Quesos con Champiñones"),
                ("queso&jamon.png.png", "Pizza de Jamon y Queso");
        `);

        next();

    } catch (err) {

        httpError({ resp, err });
    }
}

export const tableStores = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    try {

        await pool.query(`
            create table if not exists stores(
                logo varchar(20),
                title varchar(20) not null,
                descriptionStores varchar(60) not null,
                direction varchar(20) not null,
                id int primary key auto_increment
            );
        `);

        const [stores] = await pool.query(`
            select * from stores;
        `) as unknown[][];

        if (stores.length > 0) {

            next();
            return;
        }

        await pool.query(`
            insert into stores (logo, title, descriptionStores, direction) values
                ("Panos_pizza.png", "Pano's Pizza", 'Esta pizzeria se especializa en ingredientes salados', "Calle 1 #2-3"),
                ("Sbarro.png", "SBarro", 'Esta pizzeria se especializa en ingredientes picantes', "Calle 2 #3-4"),
                ("pizzeria_camion.png", "Pizzeria Camión", 'Esta pizzeria se especializa en ingredientes vegetales', "Calle 3 #4-5"),
                ("voglia_di_pizza.png", "Voglia Di Pizza", 'Esta pizzeria se especializa en ingredientes maarinos', "Calle 4 #5-6"),
                ("stroller_pizza.png", "Stroller Pizza", 'Esta pizzeria se especializa en ingredientes tropicales', "Calle 5 #6-7"),
                ("trulli.png", "Trulli", 'Esta pizzeria se especializa en ingredientes mediterraneos', "Calle 9 #10-11");
        `);

        next();

    } catch (err) {

        httpError({ resp, err });
    }
}
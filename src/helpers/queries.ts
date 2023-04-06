import { type Response } from 'express';
import { type User } from '@interfaces/users';
import { pool } from '@config/db';
import { httpError } from '@helpers/handleError';

interface UsersByEmail {
    email: string;
    resp: Response;
    message?: string;
    isChangeCondition?: boolean;
    token?: string;
}

class Querys {

    private _user: User;

    constructor(_user: User) {
        this._user = _user;
    }

    public getUsersByEmail = async ({ email, resp, message="El usuario no existe", isChangeCondition=false }: UsersByEmail): Promise<boolean> => {

        const [users] = await pool.query(`
            select * from users where email = '${email}';
        `) as unknown as User[][];
        
        switch(isChangeCondition) {
            case false: {
                if (users.length === 0) {
                    
                    httpError({ resp, err: message, status: 400 });
                    return true;
                }

                break;
            }
            case true: {
                if (users.length > 0) {
                    
                    httpError({ resp, err: message, status: 400 });
                    return true;
                }

                break;
            }
        }

        this.user = users[0];

        return false;
    }

    public getUsersByToken = async ({ token='', resp, message="El usuario no existe", isChangeCondition=false }: Omit<UsersByEmail, 'email'>): Promise<boolean> => {

        const [users] = await pool.query(`
            select * from users where tokenURL = '${token}';
        `) as unknown as User[][];
        
        if (users.length === 0) {
                    
            httpError({ resp, err: message, status: 400 });
            return true;
        }

        this.user = users[0];

        return false;
    }

    private set user(user: User) {
        this._user = user;
    }

    public get user(): User {

        return this._user;
    }
}

export const querys = new Querys(
    {email: '', img: '', lastName: '', name: '', password: '', tokenURL: '', token: ''},
);
export interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    tokenURL: string;
    img: string;
    idImage: string;
}

export const defaultUser = {
    email: '',
    img: '',
    lastName: '',
    name: '',
    password: '',
    tokenURL: '',
    token: '',
    idImage: '',
}
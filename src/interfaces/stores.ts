export interface Stores {
    logo: string;
    title: string;
    descriptionStores: string;
    direction: string;
    id: number;
}

export interface DetailStore extends Stores {
    img: string;
    descriptionPizza: string;
}

export interface Paginate {
    page: number;
    rowsPerPage: number;
}
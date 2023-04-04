export interface Stores {
    logo: string;
    title: string;
    descriptionStores: string;
    direction: string;
    idDetail: number;
    id: number;
}

export interface StoresAndDetailStore extends Stores {
    img: string;
    descriptionPizza: string;
}

export interface Paginate {
    page: number;
    rowsPerPage: number;
}
type StoreListItemDto = {
    id: string;
    name: string;
    imageUrl: string;
    address: string;
};

export type StoresDto = {
    data: StoreListItemDto[];
    total: number;
};

type PizzaDto = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
};

export type StoreDetailsResponseDto = {
    id: string;
    name: string;
    imageUrl: string;
    address: string;
    description: string;
    pizzas: PizzaDto[];
};

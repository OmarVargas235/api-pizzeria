import { Decimal } from "@prisma/client/runtime/library";

export const createStore = () => ({
    id: "store-1",
    name: "Pizza Store",
    imageUrl: "store.jpg",
    address: "Street 1",
    description: "Best pizzas",
    createdAt: new Date(),
    updatedAt: new Date(),
    pizzas: [
        {
            id: "pizza-1",
            name: "Pepperoni",
            imageUrl: "pizza.jpg",
            description: "Pepperoni pizza",
            price: new Decimal(25000),
            storeId: "store-1",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
});

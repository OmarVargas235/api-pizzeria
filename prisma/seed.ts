import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const storeImages = [
    "/assets/store-1.png",
    "/assets/store-2.png",
    "/assets/store-3.png",
    "/assets/store-4.png",
    "/assets/store-5.png",
    "/assets/store-6.png",
];

const pizzaImages = [
    "/assets/pizza-1.png",
    "/assets/pizza-2.png",
    "/assets/pizza-3.png",
    "/assets/pizza-4.png",
    "/assets/pizza-5.png",
    "/assets/pizza-6.png",
];

async function main() {
    await prisma.pizza.deleteMany();
    await prisma.store.deleteMany();

    for (let storeIndex = 1; storeIndex <= 10; storeIndex++) {
        const imageUrl = storeImages[(storeIndex - 1) % storeImages.length];
        const pizzaUrl = pizzaImages[(storeIndex - 1) % storeImages.length];
        const store = await prisma.store.create({
            data: {
                name: `Pizza Store ${storeIndex}`,
                imageUrl,
                address: `Street ${storeIndex}`,
                description: `Description for store ${storeIndex}`,
            },
        });

        const pizzas = Array.from({ length: 10 }, (_, pizzaIndex) => ({
            name: `Pizza ${pizzaIndex + 1}`,
            imageUrl: pizzaUrl,
            description: `Pizza description ${pizzaIndex + 1}`,
            price: (pizzaIndex + 1) * 10000,
            storeId: store.id,
        }));

        await prisma.pizza.createMany({
            data: pizzas,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });

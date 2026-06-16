import { prisma } from "@database/prisma.js";

export class StoreRepository {
    findById = (id: string) => {
        return prisma.store.findUnique({
            where: { id },
            include: { pizzas: true },
        });
    };

    findAll = async (page: number, limit: number) => {
        const skip = (page - 1) * limit;
        const [stores, total] = await Promise.all([
            prisma.store.findMany({
                skip,
                take: limit,
            }),
            prisma.store.count(),
        ]);
        return {
            stores,
            total,
        };
    };
}

import type { Prisma } from "@prisma/client";
import { prisma } from "@database/prisma.js";

export class AuthRepository {
    findByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: { email },
        });
    };

    createUser = (data: Prisma.UserCreateInput) => {
        return prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });
    };
}

import { prisma } from "@database/prisma.js";

export class AuthRepository {
    findByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: { email },
        });
    };

    createUser = (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => {
        return prisma.user.create({ data });
    };
}

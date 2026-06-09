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

    findByResetToken = (token: string) => {
        return prisma.user.findFirst({
            where: { resetToken: token },
        });
    };

    updateUserById = (id: string, data: Prisma.UserUpdateInput) => {
        return prisma.user.update({
            where: { id },
            data,
        });
    };

    updateRefreshToken = (userId: string, token: string | null) => {
        return prisma.user.update({
            where: { id: userId },
            data: { refreshToken: token },
        });
    };

    findById = (id: string) => {
        return prisma.user.findUnique({
            where: { id },
        });
    };
}

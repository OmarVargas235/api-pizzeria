import { prisma } from "@database/prisma.js";
import type { UpdateProfileData } from "../types/index.js";

export class ProfileRepository {
    findById = (id: string) => {
        return prisma.user.findUnique({
            where: { id },
        });
    };

    updateProfile = (userId: string, data: UpdateProfileData) => {
        return prisma.user.update({
            where: { id: userId },
            data,
        });
    };
}

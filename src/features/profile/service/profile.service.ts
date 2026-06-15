// import bcrypt from "bcrypt";
// import crypto from "crypto";
import { AppError } from "@shared/errors/app-error.js";
import { HTTP_STATUS } from "@shared/http/status.js";
// import { generateAccessToken, generateRefreshToken, verifyToken } from "@shared/auth/jwt.js";
import { ProfileRepository } from "../repository/profile.repository.js";
import type { ProfileResponseDto } from "../dto/profile-response.dto.js";
import type { UpdateProfileData } from "../types/index.js";
// import type { RegisterDto, RegisterResponseDto } from "../dto/register.schema.js";
// import type { LoginDto, LoginResponseDto } from "../dto/login.schema.js";
// import type { ForgotPasswordDto } from "../dto/forgot-password.js";
// import type { ResetPasswordDto } from "../dto/reset-password.schema.js";
// import type { RefreshTokenDto } from "../dto/refresh-token.schema.js";

export class ProfileService {
    private readonly profileRepository = new ProfileRepository();

    getProfile = async (userId: string): Promise<ProfileResponseDto> => {
        const user = await this.profileRepository.findById(userId);
        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
        };
    };

    updateProfile = async (
        userId: string,
        data: UpdateProfileData,
    ): Promise<ProfileResponseDto> => {
        const user = await this.profileRepository.findById(userId);
        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
        }
        const updatedUser = await this.profileRepository.updateProfile(userId, data);
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            avatarUrl: updatedUser.avatarUrl,
        };
    };
}

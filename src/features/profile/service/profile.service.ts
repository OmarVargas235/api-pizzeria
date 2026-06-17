import { ERROR_CODES, AppError } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import type { StorageService } from "@shared/storage/storage.service.js";
import type { ProfileRepository } from "../repository/profile.repository.js";
import type { ProfileResponseDto } from "../dto/profile-response.dto.js";
import type { UpdateProfileData } from "../types/index.js";

export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly storageService: StorageService,
    ) {}

    getProfile = async (userId: string): Promise<ProfileResponseDto> => {
        const user = await this.profileRepository.findById(userId);
        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.RESOURCE.USER_NOT_FOUND);
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
            throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.RESOURCE.USER_NOT_FOUND);
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

    updateAvatar = async (
        userId: string,
        file: Express.Multer.File,
    ): Promise<ProfileResponseDto> => {
        const user = await this.profileRepository.findById(userId);
        if (!user) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_CODES.RESOURCE.USER_NOT_FOUND);
        }
        const uploadResult = await this.storageService.uploadAvatar(file.buffer, user.id);
        const updatedUser = await this.profileRepository.updateAvatar(
            user.id,
            uploadResult.secure_url,
        );
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            avatarUrl: updatedUser.avatarUrl,
        };
    };
}

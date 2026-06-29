import type { UploadApiResponse } from "cloudinary";
import { ProfileService } from "@features/profile/service/profile.service.js";
import { ProfileRepository } from "@features/profile/repository/profile.repository.js";
import { StorageService } from "@shared/storage/storage.service.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { ERROR_CODES } from "@shared/errors/index.js";
import { createUser, createFileAvatar } from "../../factories/profile.factory";

type User = NonNullable<Awaited<ReturnType<ProfileRepository["findById"]>>>;
const userMock: User = createUser();
const avatarMock: Express.Multer.File = createFileAvatar();

describe("ProfileService", () => {
    let profileService: ProfileService;
    let mockProfileRepository: jest.Mocked<ProfileRepository>;
    let mockStorageService: jest.Mocked<StorageService>;

    beforeEach(() => {
        mockProfileRepository = {
            findById: jest.fn(),
            updateProfile: jest.fn(),
            updateAvatar: jest.fn(),
        } as unknown as jest.Mocked<ProfileRepository>;
        mockStorageService = {
            uploadAvatar: jest.fn(),
        } as unknown as jest.Mocked<StorageService>;
        profileService = new ProfileService(mockProfileRepository, mockStorageService);
    });

    it("should throw USER_NOT_FOUND when user does not exist", async () => {
        mockProfileRepository.findById.mockResolvedValue(null);
        await expect(profileService.getProfile("user-id")).rejects.toMatchObject({
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_CODES.RESOURCE.USER_NOT_FOUND,
        });
    });

    it("should return profile when user exists", async () => {
        mockProfileRepository.findById.mockResolvedValue(userMock);
        const result = await profileService.getProfile("user-1");
        expect(result).toEqual({
            avatarUrl: null,
            email: "test@gmail.com",
            firstName: "pepito",
            id: "user-1",
            lastName: "perez",
        });
    });

    it("should throw USER_NOT_FOUND when updating non existing user", async () => {
        mockProfileRepository.findById.mockResolvedValue(null);
        await expect(
            profileService.updateProfile("user-id", { firstName: "", lastName: "" }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_CODES.RESOURCE.USER_NOT_FOUND,
        });
    });

    it("should update profile successfully", async () => {
        mockProfileRepository.findById.mockResolvedValue(userMock);
        mockProfileRepository.updateProfile.mockResolvedValue(userMock);
        const result = await profileService.updateProfile("user-id", {
            firstName: "Pedro",
            lastName: "Acuña",
        });
        expect(mockProfileRepository.updateProfile).toHaveBeenCalledWith("user-id", {
            firstName: "Pedro",
            lastName: "Acuña",
        });
        expect(result).toEqual({
            id: "user-1",
            email: "test@gmail.com",
            firstName: "pepito",
            lastName: "perez",
            avatarUrl: null,
        });
    });

    it("should throw USER_NOT_FOUND when updateAvatar non existing user", async () => {
        mockProfileRepository.findById.mockResolvedValue(null);
        await expect(profileService.updateAvatar("user-id", avatarMock)).rejects.toMatchObject({
            status: HTTP_STATUS.NOT_FOUND,
            message: ERROR_CODES.RESOURCE.USER_NOT_FOUND,
        });
    });

    it("should avatar updated profile successfully", async () => {
        mockProfileRepository.findById.mockResolvedValue(userMock);
        mockStorageService.uploadAvatar.mockResolvedValue({
            secure_url: "https://cloudinary.com/avatar.png",
        } as UploadApiResponse);
        mockProfileRepository.updateAvatar.mockResolvedValue({
            ...userMock,
            avatarUrl: "https://cloudinary.com/avatar.png",
        });
        const result = await profileService.updateAvatar("user-1", avatarMock);
        expect(mockStorageService.uploadAvatar).toHaveBeenCalledWith(avatarMock.buffer, "user-1");
        expect(mockProfileRepository.updateAvatar).toHaveBeenCalledWith(
            "user-1",
            "https://cloudinary.com/avatar.png",
        );
        expect(result).toEqual({
            id: "user-1",
            email: "test@gmail.com",
            firstName: "pepito",
            lastName: "perez",
            avatarUrl: "https://cloudinary.com/avatar.png",
        });
    });
});

import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@shared/auth/jwt.js";
import { AuthService } from "@features/auth/service/auth.service.js";
import { AuthRepository } from "@features/auth/repository/auth.repository.js";
import { EmailService } from "@shared/email/email.service.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { ERROR_CODES } from "@shared/errors/index.js";
import { createUser } from "../../factories/profile.factory.js";

jest.mock("crypto");
jest.mock("bcrypt");
jest.mock("@shared/auth/jwt.js", () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    verifyToken: jest.fn(),
}));

type User = NonNullable<Awaited<ReturnType<AuthRepository["findByEmail"]>>>;
const userMock: User = createUser();
const mockedBcrypt = bcrypt as unknown as {
    hash: jest.Mock<Promise<string>, [string, number]>;
    compare: jest.Mock<Promise<boolean>, [string, string]>;
};
const mockedCrypto = crypto as unknown as {
    randomBytes: jest.Mock<Buffer, [number]>;
};

describe("AuthService", () => {
    let authService: AuthService;
    let mockAuthRepository: jest.Mocked<AuthRepository>;
    let mockEmailService: jest.Mocked<EmailService>;

    beforeEach(() => {
        mockAuthRepository = {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
            findByResetToken: jest.fn(),
            updateUserById: jest.fn(),
            updateRefreshToken: jest.fn(),
            findById: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;
        mockEmailService = {
            sendResetPasswordEmail: jest.fn(),
        } as unknown as jest.Mocked<EmailService>;
        authService = new AuthService(mockAuthRepository, mockEmailService);
    });

    it("should throw INVALID_CREDENTIALS when user does not exist", async () => {
        mockAuthRepository.findById.mockResolvedValue(null);
        await expect(
            authService.login({
                email: "test@gmail.com",
                password: "123456",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: ERROR_CODES.AUTH.INVALID_CREDENTIALS,
        });
    });

    it("should throw INVALID_CREDENTIALS when password is invalid", async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(userMock);
        mockedBcrypt.compare.mockResolvedValue(false);
        await expect(
            authService.login({
                email: "test@gmail.com",
                password: "wrong-password",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: ERROR_CODES.AUTH.INVALID_CREDENTIALS,
        });
    });

    it("should return tokens when credentials are valid", async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(userMock);
        mockedBcrypt.compare.mockResolvedValue(true);
        (generateAccessToken as jest.Mock).mockReturnValue("access-token");
        (generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");
        const result = await authService.login({
            email: "test@gmail.com",
            password: "123456",
        });
        expect(result).toEqual({
            accessToken: "access-token",
            refreshToken: "refresh-token",
        });
    });

    it("should throw EMAIL_ALREADY_EXISTS when email exists", async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(userMock);
        await expect(
            authService.register({
                email: "test@gmail.com",
                password: "123456",
                name: "Pedro",
                lastName: "Perez",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.CONFLICT,
            message: ERROR_CODES.RESOURCE.EMAIL_ALREADY_EXISTS,
        });
    });

    it("should register user successfully", async () => {
        const createdUser = {
            id: "user-1",
            email: "test@gmail.com",
            firstName: "Pedro",
            lastName: "Perez",
            createdAt: new Date(),
        };
        mockAuthRepository.findByEmail.mockResolvedValue(null);
        mockedBcrypt.hash.mockResolvedValue("hashed-password");
        mockAuthRepository.createUser.mockResolvedValue(createdUser);
        const result = await authService.register({
            email: "test@gmail.com",
            password: "123456",
            name: "Pedro",
            lastName: "Perez",
        });
        expect(mockedBcrypt.hash).toHaveBeenCalledWith("123456", 12);
        expect(mockAuthRepository.createUser).toHaveBeenCalledWith({
            email: "test@gmail.com",
            password: "hashed-password",
            firstName: "Pedro",
            lastName: "Perez",
        });
        expect(result).toEqual(createdUser);
    });

    it("should do nothing when user does not exist", async () => {
        mockAuthRepository.findByEmail.mockResolvedValue(null);
        await authService.forgotPassword({ email: "test@gmail.com" });
        expect(mockAuthRepository.updateUserById).not.toHaveBeenCalled();
        expect(mockEmailService.sendResetPasswordEmail).not.toHaveBeenCalled();
    });

    it("should generate token and send reset email", async () => {
        const token = "reset-token";
        mockAuthRepository.findByEmail.mockResolvedValue(userMock);
        mockedCrypto.randomBytes.mockReturnValue(Buffer.from(token));
        await authService.forgotPassword({ email: "test@gmail.com" });
        expect(mockAuthRepository.updateUserById).toHaveBeenCalled();
        expect(mockAuthRepository.updateUserById).toHaveBeenCalledWith(
            userMock.id,
            expect.objectContaining({
                resetToken: expect.any(String),
                resetTokenExpiry: expect.any(Date),
            }),
        );
        expect(mockEmailService.sendResetPasswordEmail).toHaveBeenCalledWith(
            userMock.email,
            expect.any(String),
        );
    });

    it("should throw INVALID_TOKEN when token does not exist", async () => {
        mockAuthRepository.findByResetToken.mockResolvedValue(null);
        await expect(
            authService.resetPassword({
                token: "token",
                password: "123456",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_CODES.AUTH.INVALID_TOKEN,
        });
    });

    it("should throw INVALID_TOKEN when resetTokenExpiry is null", async () => {
        mockAuthRepository.findByResetToken.mockResolvedValue({
            ...userMock,
            resetTokenExpiry: null,
        });
        await expect(
            authService.resetPassword({
                token: "token",
                password: "123456",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_CODES.AUTH.INVALID_TOKEN,
        });
    });

    it("should throw TOKEN_EXPIRED when token is expired", async () => {
        const expiredDate = new Date(Date.now() - 60000);
        mockAuthRepository.findByResetToken.mockResolvedValue({
            ...userMock,
            resetTokenExpiry: expiredDate,
        });
        await expect(
            authService.resetPassword({
                token: "token",
                password: "123456",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_CODES.AUTH.TOKEN_EXPIRED,
        });
    });

    it("should reset password successfully", async () => {
        const futureDate = new Date(Date.now() + 60000);
        mockAuthRepository.findByResetToken.mockResolvedValue({
            ...userMock,
            resetTokenExpiry: futureDate,
        });
        mockedBcrypt.hash.mockResolvedValue("hashed-password");
        await authService.resetPassword({
            token: "token",
            password: "123456",
        });
        expect(mockAuthRepository.updateUserById).toHaveBeenCalledWith(userMock.id, {
            password: "hashed-password",
            resetToken: null,
            resetTokenExpiry: null,
        });
        expect(mockedBcrypt.hash).toHaveBeenCalledWith("123456", 12);
    });

    it("should throw INVALID_REFRESH_TOKEN", async () => {
        (verifyToken as jest.Mock).mockReturnValue({
            userId: "user-1",
        });
        mockAuthRepository.findById.mockResolvedValue(null);
        await expect(
            authService.refreshToken({
                refreshToken: "refresh-token",
            }),
        ).rejects.toMatchObject({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN,
        });
    });

    it("should generate new tokens", async () => {
        (verifyToken as jest.Mock).mockReturnValue({
            userId: "user-1",
        });
        mockAuthRepository.findById.mockResolvedValue({
            ...userMock,
            refreshToken: "refresh-token",
        });
        (generateAccessToken as jest.Mock).mockReturnValue("new-access-token");
        (generateRefreshToken as jest.Mock).mockReturnValue("new-refresh-token");
        const result = await authService.refreshToken({
            refreshToken: "refresh-token",
        });
        expect(result).toEqual({
            accessToken: "new-access-token",
            refreshToken: "new-refresh-token",
        });
        expect(mockAuthRepository.updateRefreshToken).toHaveBeenCalledWith(
            "user-1",
            "new-refresh-token",
        );
    });

    it("should clear refresh token on logout", async () => {
        await authService.logout("user-1");
        expect(mockAuthRepository.updateRefreshToken).toHaveBeenCalledWith("user-1", null);
    });
});

import bcrypt from "bcrypt";
import crypto from "crypto";
import { ERROR_CODES, AppError } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { EmailService } from "@shared/email/email.service.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@shared/auth/jwt.js";
import { AuthRepository } from "../repository/auth.repository.js";
import type { RegisterDto, RegisterResponseDto } from "../dto/register.schema.js";
import type { LoginDto, LoginResponseDto } from "../dto/login.schema.js";
import type { ForgotPasswordDto } from "../dto/forgot-password.js";
import type { ResetPasswordDto } from "../dto/reset-password.schema.js";
import type { RefreshTokenDto } from "../dto/refresh-token.schema.js";

export class AuthService {
    private readonly authRepository = new AuthRepository();
    private readonly emailService = new EmailService();

    login = async (data: LoginDto): Promise<LoginResponseDto> => {
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.AUTH.INVALID_CREDENTIALS);
        }
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.authRepository.updateRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    };

    register = async (data: RegisterDto): Promise<RegisterResponseDto> => {
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError(HTTP_STATUS.CONFLICT, ERROR_CODES.RESOURCE.EMAIL_ALREADY_EXISTS);
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await this.authRepository.createUser({
            email: data.email,
            password: hashedPassword,
            firstName: data.name,
            lastName: data.lastName,
        });
        return user;
    };

    forgotPassword = async (data: ForgotPasswordDto) => {
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) return;
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 1000 * 60 * 15);
        await this.authRepository.updateUserById(user.id, {
            resetToken: token,
            resetTokenExpiry: expiry,
        });
        await this.emailService.sendResetPasswordEmail(user.email, token);
    };

    resetPassword = async (data: ResetPasswordDto) => {
        const user = await this.authRepository.findByResetToken(data.token);
        if (!user || !user.resetTokenExpiry) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, ERROR_CODES.AUTH.INVALID_TOKEN);
        }
        if (user.resetTokenExpiry < new Date()) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, ERROR_CODES.AUTH.TOKEN_EXPIRED);
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 12);
        await this.authRepository.updateUserById(user.id, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        });
    };

    refreshToken = async (data: RefreshTokenDto): Promise<LoginResponseDto> => {
        const payload = verifyToken(data.refreshToken);
        const user = await this.authRepository.findById(payload.userId);
        if (!user || user.refreshToken !== data.refreshToken) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN);
        }
        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);
        await this.authRepository.updateRefreshToken(user.id, newRefreshToken);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    };

    logout = async (userId: string) => {
        await this.authRepository.updateRefreshToken(userId, null);
    };
}

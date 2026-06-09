import bcrypt from "bcrypt";
import crypto from "crypto";
import { AppError } from "@shared/errors/app-error.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@shared/auth/jwt.js";
import { AuthRepository } from "../repository/auth.repository.js";
import type { RegisterDto, RegisterResponseDto } from "../dto/register.schema.js";
import type { LoginDto, LoginResponseDto } from "../dto/login.schema.js";
import type { ForgotPasswordDto } from "../dto/forgot-password.js";
import type { ResetPasswordDto } from "../dto/reset-password.schema.js";
import type { RefreshTokenDto } from "../dto/refresh-token.schema.js";

export class AuthService {
    private readonly authRepository = new AuthRepository();

    login = async (data: LoginDto): Promise<LoginResponseDto> => {
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
        }
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.authRepository.updateRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    };

    register = async (data: RegisterDto): Promise<RegisterResponseDto> => {
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError(HTTP_STATUS.CONFLICT, "Email already exists");
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
        if (!user) {
            return {
                message:
                    "If an account is associated with this email, password reset instructions will be sent shortly",
            };
        }
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 1000 * 60 * 15);
        await this.authRepository.updateUserById(user.id, {
            resetToken: token,
            resetTokenExpiry: expiry,
        });
        // eslint-disable-next-line no-console
        console.log(`Reset link: http://localhost:3000/auth/reset-password?token=${token}`);
    };

    resetPassword = async (data: ResetPasswordDto) => {
        const user = await this.authRepository.findByResetToken(data.token);
        if (!user || !user.resetTokenExpiry) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid or expired token");
        }
        if (user.resetTokenExpiry < new Date()) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, "Token expired");
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 12);
        await this.authRepository.updateUserById(user.id, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        });
        return { message: "Password updated successfully" };
    };

    refreshToken = async (data: RefreshTokenDto): Promise<LoginResponseDto> => {
        const payload = verifyToken(data.refreshToken);
        const user = await this.authRepository.findById(payload.userId);
        if (!user || user.refreshToken !== data.refreshToken) {
            throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
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
        return { message: "Logged out successfully" };
    };
}

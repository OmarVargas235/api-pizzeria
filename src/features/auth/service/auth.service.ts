import bcrypt from "bcrypt";
import { AppError } from "@shared/errors/app-error.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { generateToken } from "@shared/auth/jwt.js";
import { AuthRepository } from "../repository/auth.repository.js";
import type { RegisterDto, RegisterResponseDto } from "../dto/register.schema.js";
import type { LoginDto, LoginResponseDto } from "../dto/login.schema.js";

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
        const token = generateToken(user.id);
        return { accessToken: token };
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
}

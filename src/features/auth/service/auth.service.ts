import bcrypt from "bcrypt";
import { AppError } from "@shared/errors/app-error.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { AuthRepository } from "../repository/auth.repository.js";
import type { RegisterDto } from "../dto/register.schema.js";

export class AuthService {
    private readonly authRepository = new AuthRepository();

    login = async (email: string) => {
        await this.authRepository.findByEmail(email);
    };

    register = async (data: RegisterDto) => {
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
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
        };
    };
}

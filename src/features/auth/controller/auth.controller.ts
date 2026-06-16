import type { Request, Response } from "express";
import { created, ok } from "@shared/http/responses.js";
import { AuthService } from "../service/auth.service.js";
import { registerSchema } from "../dto/register.schema.js";
import { loginSchema } from "../dto/login.schema.js";
import { forgotPasswordSchema } from "../dto/forgot-password.js";
import { resetPasswordSchema } from "../dto/reset-password.schema.js";
import { refreshTokenSchema } from "../dto/refresh-token.schema.js";

export class AuthController {
    private readonly authService = new AuthService();

    login = async (req: Request, res: Response) => {
        const data = loginSchema.parse(req.body);
        const user = await this.authService.login(data);
        return ok(res, user, "Login successful");
    };

    register = async (req: Request, res: Response) => {
        const data = registerSchema.parse(req.body);
        const user = await this.authService.register(data);
        return created(res, user, "User created");
    };

    forgotPassword = async (req: Request, res: Response) => {
        const data = forgotPasswordSchema.parse(req.body);
        const result = await this.authService.forgotPassword(data);
        return ok(
            res,
            result,
            "If an account is associated with this email, password reset instructions will be sent shortly",
        );
    };

    resetPassword = async (req: Request, res: Response) => {
        const data = resetPasswordSchema.parse(req.body);
        const result = await this.authService.resetPassword(data);
        return ok(res, result, "Password reset successful");
    };

    refreshToken = async (req: Request, res: Response) => {
        const data = refreshTokenSchema.parse(req.body);
        const result = await this.authService.refreshToken(data);
        return ok(res, result, "Token refreshed");
    };

    logout = async (req: Request, res: Response) => {
        const userId = req.user.userId;
        const result = await this.authService.logout(userId);
        return ok(res, result, "Logout successful");
    };
}

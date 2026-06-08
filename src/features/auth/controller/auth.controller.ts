import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service.js";
import { registerSchema } from "../dto/register.schema.js";
import { loginSchema } from "../dto/login.schema.js";
import { created, ok } from "@shared/http/responses.js";

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
}

import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service.js";
import { registerSchema } from "../dto/register.schema.js";
import { created } from "@shared/http/responses.js";

export class AuthController {
    private readonly authService = new AuthService();

    login = async () => {
        await this.authService.login("email");
    };

    register = async (req: Request, res: Response) => {
        const data = registerSchema.parse(req.body);
        const user = await this.authService.register(data);
        return created(res, user, "User created");
    };
}

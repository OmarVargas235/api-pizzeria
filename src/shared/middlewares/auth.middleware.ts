import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@shared/auth/jwt.js";
import { AppError } from "@shared/errors/app-error.js";
import { HTTP_STATUS } from "@shared/http/status.js";

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Missing token");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid token format");
    }
    try {
        const payload = verifyToken(token);
        req.user = { userId: payload.userId };
        next();
    } catch {
        throw new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token");
    }
};

import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@shared/auth/jwt.js";
import { AppError } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Missing token"));
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid token format"));
    }
    try {
        const payload = verifyToken(token);
        req.user = { userId: payload.userId };
        return next();
    } catch {
        return next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token"));
    }
};

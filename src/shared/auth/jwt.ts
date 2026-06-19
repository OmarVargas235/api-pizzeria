import jwt from "jsonwebtoken";
import { AppError } from "@shared/errors/app-error.js";
import { ERROR_CODES } from "@shared/errors/error-codes.js";
import { HTTP_STATUS } from "@shared/http/status.js";

export const generateAccessToken = (userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "1h",
    });
};

export const generateRefreshToken = (userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.AUTH.INVALID_REFRESH_TOKEN);
    }
};

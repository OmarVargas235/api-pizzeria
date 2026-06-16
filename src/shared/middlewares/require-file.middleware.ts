import type { Request, NextFunction } from "express";
import { AppError, ERROR_CODES } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";

export const requireFileMiddleware = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.file) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, ERROR_CODES.FILE.FILE_REQUIRED);
        }
        next();
    };
};

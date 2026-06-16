import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import multer from "multer";
import { AppError, formatZodErrors } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";
import { logger } from "@shared/loggers/index.js";

export const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (error instanceof ZodError) {
        logger.warn({
            type: "VALIDATION_ERROR",
            method: _req.method,
            url: _req.url,
            issues: error.issues,
        });
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "VALIDATION_FAILED",
            data: formatZodErrors(error.issues),
        });
    }
    if (error instanceof AppError) {
        logger.warn({
            type: "APP_ERROR",
            method: _req.method,
            url: _req.url,
            status: error.status,
            message: error.message,
        });
        return res.status(error.status).json({
            message: error.message,
            data: null,
        });
    }
    if (
        error instanceof SyntaxError &&
        "status" in error &&
        error.status === 400 &&
        "body" in error
    ) {
        logger.warn({
            type: "INVALID_JSON",
            method: _req.method,
            url: _req.url,
        });
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid JSON format",
            data: null,
        });
    }
    if (error instanceof multer.MulterError) {
        logger.warn({
            type: "UPLOAD_ERROR",
            code: error.code,
            message: error.message,
        });
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "File size exceeds the maximum allowed limit",
                data: null,
            });
        }
    }
    logger.error({
        type: "UNHANDLED_ERROR",
        method: _req.method,
        url: _req.url,
        message: error.message,
        stack: error.stack,
    });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "INTERNAL_SERVER_ERROR",
        data: null,
    });
};

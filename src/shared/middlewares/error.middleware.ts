import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, formatZodErrors } from "@shared/errors/index.js";
import { HTTP_STATUS } from "@shared/http/status.js";

export const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (error instanceof ZodError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "VALIDATION_FAILED",
            data: formatZodErrors(error.issues),
        });
    }
    if (error instanceof AppError) {
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
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid JSON format",
            data: null,
        });
    }
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "INTERNAL_SERVER_ERROR",
        data: null,
    });
};

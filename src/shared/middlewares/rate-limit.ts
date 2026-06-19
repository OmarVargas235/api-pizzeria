import type { RequestHandler } from "express";
import { env } from "@config/env.js";
import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
});

export const testSafeLimiter = (limiter: RequestHandler): RequestHandler => {
    return env.NODE_ENV === "test" ? (_req, _res, next) => next() : limiter;
};

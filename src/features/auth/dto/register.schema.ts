import { z } from "zod";
import { ERROR_CODES } from "@shared/errors/index.js";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(50, ERROR_CODES.VALIDATION.TOO_LONG)
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, ERROR_CODES.VALIDATION.INVALID_FORMAT),
    lastName: z
        .string()
        .trim()
        .min(2, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(50, ERROR_CODES.VALIDATION.TOO_LONG)
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, ERROR_CODES.VALIDATION.INVALID_FORMAT),
    email: z.email(ERROR_CODES.VALIDATION.INVALID_EMAIL).trim().toLowerCase(),
    password: z
        .string()
        .min(6, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(100)
        .refine(
            (value) => value === value.trim(),
            ERROR_CODES.VALIDATION.HAS_LEADING_OR_TRAILING_SPACES,
        )
        .regex(/[A-Z]/, ERROR_CODES.VALIDATION.MISSING_UPPERCASE)
        .regex(/[a-z]/, ERROR_CODES.VALIDATION.MISSING_LOWERCASE)
        .regex(/[0-9]/, ERROR_CODES.VALIDATION.MISSING_NUMBER),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export interface RegisterResponseDto {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
}

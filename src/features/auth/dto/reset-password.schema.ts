import { z } from "zod";
import { ERROR_CODES } from "@shared/errors/index.js";

export const resetPasswordSchema = z.object({
    token: z.string().min(1),
    newPassword: z
        .string()
        .min(6, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(100)
        .regex(/[A-Z]/, ERROR_CODES.VALIDATION.MISSING_UPPERCASE)
        .regex(/[a-z]/, ERROR_CODES.VALIDATION.MISSING_LOWERCASE)
        .regex(/[0-9]/, ERROR_CODES.VALIDATION.MISSING_NUMBER),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

import { z } from "zod";
import { ERROR_CODES } from "@shared/errors/index.js";

export const updateProfileSchema = z.object({
    firstName: z
        .string({ error: ERROR_CODES.VALIDATION.REQUIRED })
        .trim()
        .min(2, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(100, ERROR_CODES.VALIDATION.TOO_LONG),

    lastName: z
        .string({ error: ERROR_CODES.VALIDATION.REQUIRED })
        .trim()
        .min(2, ERROR_CODES.VALIDATION.TOO_SHORT)
        .max(100, ERROR_CODES.VALIDATION.TOO_LONG),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

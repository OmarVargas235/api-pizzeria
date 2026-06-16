import { z } from "zod";
import { ERROR_CODES } from "@shared/errors/index.js";

export const forgotPasswordSchema = z.object({
    email: z.email(ERROR_CODES.VALIDATION.INVALID_EMAIL).trim().toLowerCase(),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

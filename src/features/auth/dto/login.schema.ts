import { z } from "zod";
import { ERROR_CODES } from "@shared/errors/index.js";

export const loginSchema = z.object({
    email: z.email(ERROR_CODES.VALIDATION.INVALID_EMAIL).trim().toLowerCase(),
    password: z.string().min(6, ERROR_CODES.VALIDATION.TOO_SHORT),
});

export type LoginDto = z.infer<typeof loginSchema>;

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
}

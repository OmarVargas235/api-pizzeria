import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email inválido").trim().toLowerCase(),
    password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginDto = z.infer<typeof loginSchema>;

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
}

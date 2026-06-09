import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email("Email inválido").trim().toLowerCase(),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

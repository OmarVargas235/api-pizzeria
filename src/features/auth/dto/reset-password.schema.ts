import { z } from "zod";

export const resetPasswordSchema = z.object({
    token: z.string().min(1),
    newPassword: z
        .string()
        .min(6, "Mínimo 6 caracteres")
        .max(100)
        .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
        .regex(/[a-z]/, "Debe tener al menos una minúscula")
        .regex(/[0-9]/, "Debe tener al menos un número"),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

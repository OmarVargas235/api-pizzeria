import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "El nombre es muy corto")
        .max(50, "El nombre es muy largo")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras en el nombre"),
    lastName: z
        .string()
        .trim()
        .min(2, "El apellido es muy corto")
        .max(50, "El apellido es muy largo")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras en el apellido"),
    email: z.email("Email inválido").trim().toLowerCase(),
    password: z
        .string()
        .min(6, "Mínimo 6 caracteres")
        .max(100)
        .refine(
            (value) => value === value.trim(),
            "La contraseña no puede iniciar ni terminar con espacios",
        )
        .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
        .regex(/[a-z]/, "Debe tener al menos una minúscula")
        .regex(/[0-9]/, "Debe tener al menos un número"),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export interface RegisterResponseDto {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
}

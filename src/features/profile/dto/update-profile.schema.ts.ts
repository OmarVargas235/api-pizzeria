import { z } from "zod";

export const updateProfileSchema = z.object({
    firstName: z
        .string({ error: "Last name is required" })
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres.")
        .max(100, "El nombre es demasiado largo"),

    lastName: z
        .string({ error: "Last name is required" })
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name is too long"),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

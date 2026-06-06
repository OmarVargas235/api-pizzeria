import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);

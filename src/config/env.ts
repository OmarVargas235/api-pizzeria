import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
    path: process.env.ENV_FILE ?? ".env",
    override: true,
});

const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(32),
    EMAIL_USER: z.email(),
    EMAIL_PASSWORD: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    FRONTEND_URL: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = Object.freeze(envSchema.parse(process.env));

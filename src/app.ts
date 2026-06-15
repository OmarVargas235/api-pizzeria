import express from "express";
import authRoutes from "@features/auth/routes/auth.js";
import profileRoutes from "@features/profile/routes/profile.js";
import { errorMiddleware } from "@shared/middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use(errorMiddleware);

export default app;

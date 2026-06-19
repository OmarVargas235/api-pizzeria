import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "@features/auth/routes/auth.js";
import profileRoutes from "@features/profile/routes/profile.js";
import storeRoutes from "@features/stores/routes/store.js";
import { errorMiddleware } from "@shared/middlewares/error.middleware.js";
import { env } from "@config/env.js";
import { globalLimiter, testSafeLimiter } from "@shared/middlewares/rate-limit.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(testSafeLimiter(globalLimiter));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/store", storeRoutes);
app.use(errorMiddleware);

export default app;

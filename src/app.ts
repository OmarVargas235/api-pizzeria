import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { errorMiddleware } from "@shared/middlewares/error.middleware.js";
import { env } from "@config/env.js";
import { globalLimiter, testSafeLimiter } from "@shared/middlewares/rate-limit.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import routes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(testSafeLimiter(globalLimiter));

app.use(
    "/assets",
    (req, res, next) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    },
    express.static(path.resolve("public/assets")),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);
app.use(errorMiddleware);

export default app;

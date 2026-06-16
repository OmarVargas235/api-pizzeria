import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";
import { authLimiter } from "@shared/middlewares/rate-limit.js";

const router = Router();

const authController = new AuthController();

router.post("/login", authLimiter, asyncHandler(authController.login));
router.post("/register", asyncHandler(authController.register));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/reset-password", asyncHandler(authController.resetPassword));
router.post("/refresh-token", asyncHandler(authController.refreshToken));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));

export default router;

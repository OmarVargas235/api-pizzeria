import { Router } from "express";
import { AuthRepository } from "../repository/auth.repository.js";
import { AuthService } from "../service/auth.service.js";
import { AuthController } from "../controller/auth.controller.js";
import { EmailService } from "@shared/email/email.service.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";
import { authLimiter, testSafeLimiter } from "@shared/middlewares/rate-limit.js";

const router = Router();

const authRepository = new AuthRepository();
const emailService = new EmailService();
const authService = new AuthService(authRepository, emailService);
const authController = new AuthController(authService);

router.post("/login", testSafeLimiter(authLimiter), asyncHandler(authController.login));
router.post("/register", asyncHandler(authController.register));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/reset-password", asyncHandler(authController.resetPassword));
router.post("/refresh-token", asyncHandler(authController.refreshToken));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));

export default router;

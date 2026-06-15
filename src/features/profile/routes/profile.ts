import { Router } from "express";
import { ProfileController } from "../controller/profile.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";

const router = Router();

const profileController = new ProfileController();

router.get("/me", authMiddleware, asyncHandler(profileController.getProfile));
router.patch("/me", authMiddleware, asyncHandler(profileController.updateProfile));
// router.patch("/avatar", authMiddleware, asyncHandler(authController.register));
// router.delete("/avatar", authMiddleware, asyncHandler(authController.register));

export default router;

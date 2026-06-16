import { Router } from "express";
import { ProfileController } from "../controller/profile.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";
import { requireFileMiddleware } from "@shared/middlewares/require-file.middleware.js";
import { upload } from "@shared/middlewares/upload.middleware.js";

const router = Router();

const profileController = new ProfileController();

router.get("/me", authMiddleware, asyncHandler(profileController.getProfile));
router.patch("/me", authMiddleware, asyncHandler(profileController.updateProfile));
router.patch(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    requireFileMiddleware,
    asyncHandler(profileController.updateAvatar),
);

export default router;

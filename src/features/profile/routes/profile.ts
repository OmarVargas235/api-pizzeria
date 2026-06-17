import { Router } from "express";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";
import { requireFileMiddleware } from "@shared/middlewares/require-file.middleware.js";
import { upload } from "@shared/middlewares/upload.middleware.js";
import { StorageService } from "@shared/storage/storage.service.js";
import { ProfileRepository } from "../repository/profile.repository.js";
import { ProfileService } from "../service/profile.service.js";
import { ProfileController } from "../controller/profile.controller.js";

const router = Router();

const profileRepository = new ProfileRepository();
const storageService = new StorageService();
const profileService = new ProfileService(profileRepository, storageService);
const profileController = new ProfileController(profileService);

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

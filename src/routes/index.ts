import { Router } from "express";

import authRoutes from "@features/auth/routes/auth.js";
import profileRoutes from "@features/profile/routes/profile.js";
import storeRoutes from "@features/stores/routes/store.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/store", storeRoutes);

export default router;

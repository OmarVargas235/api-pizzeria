import { Router } from "express";
import { StoreController } from "../controller/store.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";

const router = Router();

const storeController = new StoreController();

router.get("/", authMiddleware, asyncHandler(storeController.getStores));
router.get("/:id", authMiddleware, asyncHandler(storeController.getStoreById));

export default router;

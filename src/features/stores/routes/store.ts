import { Router } from "express";
import { StoreRepository } from "../repository/store.repository.js";
import { StoreService } from "../service/store.service.js";
import { StoreController } from "../controller/store.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";
import { authMiddleware } from "@shared/middlewares/auth.middleware.js";

const router = Router();

const storeRepository = new StoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router.get("/", authMiddleware, asyncHandler(storeController.getStores));
router.get("/:id", authMiddleware, asyncHandler(storeController.getStoreById));

export default router;

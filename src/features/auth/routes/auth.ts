import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { asyncHandler } from "@shared/http/async-handler.js";

const router = Router();

const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", asyncHandler(authController.register));

export default router;

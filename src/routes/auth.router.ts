import { Router } from "express";

import { loginController, meController } from "../controllers/auth/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginController);
router.get("/me", authMiddleware, meController);

export default router;
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController
} from "../controllers/users/user.controller.js";

const router = Router();

router.get("/",authMiddleware, getUsersController);
router.post("/",authMiddleware,createUserController);
router.patch("/:id",authMiddleware,updateUserController);
router.delete("/:id",authMiddleware,deleteUserController);
router.get("/:id",authMiddleware,getUserByIdController);

export default router;
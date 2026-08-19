import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getCompaniesController,
  getCompanyByIdController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController
} from "../controllers/company/company.controller.js";

const router = Router();

router.get("/", authMiddleware, getCompaniesController);
router.get("/:id", authMiddleware, getCompanyByIdController);
router.post("/", createCompanyController);
router.patch("/", authMiddleware, updateCompanyController);
router.delete("/:id", authMiddleware, deleteCompanyController);

export default router;
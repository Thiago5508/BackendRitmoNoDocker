import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  criarRotinaController,
  listarRotinasController,
  minhaRotinaController,
  atualizarRotinaController,
  excluirRotinaController,
} from "../controllers/weekdays/routine.controller.js";

const router = Router();


router.post("/",authMiddleware, criarRotinaController);
router.get("/", authMiddleware, listarRotinasController);
router.get("/minha-rotina", authMiddleware, minhaRotinaController);
router.put("/:id", authMiddleware, atualizarRotinaController);
router.delete("/:id", authMiddleware, excluirRotinaController);

export default router;
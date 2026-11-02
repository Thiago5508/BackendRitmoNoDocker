import { Router } from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js";

import {
  criarEventoController,
  listarEventosController,
  atualizarEventoController,
  excluirEventoController,
} from "../controllers/events/event.controller.js";

const router = Router();

router.post("/", authMiddleware, criarEventoController);

router.get("/", authMiddleware, listarEventosController);

router.put("/:id", authMiddleware, atualizarEventoController);

router.delete("/:id", authMiddleware, excluirEventoController);

export default router;
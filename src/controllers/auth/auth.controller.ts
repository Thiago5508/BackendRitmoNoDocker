import type { Request, Response } from "express";

import { login } from "../../services/auth/auth.service.js";

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const { telefone, senha } = req.body;

    const result = await login(telefone, senha);

    res.json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Credenciais inválidas"
    ) {
      res.status(401).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
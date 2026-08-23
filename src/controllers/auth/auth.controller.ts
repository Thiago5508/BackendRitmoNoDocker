import type { Request, Response } from "express";

import { getAuthenticatedUser, login } from "../../services/auth/auth.service.js";

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

export async function meController(
  req: Request,
  res: Response
) {
  try {
    const { userId } = req.user!;

    const user = await getAuthenticatedUser(userId);

    const userResponse = user.toObject();

    res.status(200).json({
      user: {
        id: userResponse._id.toString(),
        nome: userResponse.nome,
        isProfessor: userResponse.isProfessor,
        nivel: userResponse.nivel,
        telefone: userResponse.telefone,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Usuário não encontrado"
    ) {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
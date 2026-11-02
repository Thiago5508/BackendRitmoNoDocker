
import type { Request, Response } from "express";

import {
  criarRotina,
  listarRotinas,
  buscarRotinaPorNivel,
  atualizarRotina,
  excluirRotina,
} from "../../services/weekdays/routine.service.js";

const niveisValidos = [
  "iniciante",
  "intermediario",
  "avancado",
];

// Criar rotina (somente professor)
export async function criarRotinaController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user.isProfessor) {
      return res.status(403).json({
        message: "Apenas professores podem criar rotinas.",
      });
    }

    const { nivel, diasSemana, treinos } = req.body;

    if (!niveisValidos.includes(nivel)) {
      return res.status(400).json({
        message: "Nível inválido.",
      });
    }

    const rotina = await criarRotina(
      req.user.empresaId,
      nivel,
      diasSemana,
      treinos
    );

    return res.status(201).json(rotina);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno.";

    return res.status(400).json({ message });
  }
}

// Listar rotinas da empresa (somente professor)
export async function listarRotinasController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user.isProfessor) {
      return res.status(403).json({
        message: "Apenas professores podem listar as rotinas.",
      });
    }

    const rotinas = await listarRotinas(req.user.empresaId);

    return res.status(200).json(rotinas);
  } catch (error) {
    console.error("Erro ao listar rotinas:", error);

    return res.status(500).json({
      message: "Erro ao listar rotinas.",
    });
  }
}

// Consultar rotina do próprio usuário
export async function minhaRotinaController(
  req: Request,
  res: Response
) {
  try {
    const rotina = await buscarRotinaPorNivel(
      req.user.empresaId,
      req.user.nivel
    );

    if (!rotina) {
      return res.status(404).json({
        message: "Ainda não existe uma rotina cadastrada para seu nível.",
      });
    }

    return res.status(200).json(rotina);
  } catch (error) {
    console.error("Erro ao consultar rotina:", error);

    return res.status(500).json({
      message: "Erro ao consultar rotina.",
    });
  }
}

// Atualizar rotina (somente professor)
export async function atualizarRotinaController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user.isProfessor) {
      return res.status(403).json({
        message: "Apenas professores podem atualizar rotinas.",
      });
    }

    const { diasSemana, treinos } = req.body;

    const rotina = await atualizarRotina(
      req.params.id as string,
      req.user.empresaId,
      diasSemana,
      treinos
    );

    return res.status(200).json(rotina);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno.";

    return res.status(400).json({ message });
  }
}

// Excluir rotina (somente professor)
export async function excluirRotinaController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user.isProfessor) {
      return res.status(403).json({
        message: "Apenas professores podem excluir rotinas.",
      });
    }

    await excluirRotina(
      req.params.id as string,
      req.user.empresaId
    );

    return res.status(200).json({
      message: "Rotina excluída com sucesso.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno.";

    return res.status(400).json({ message });
  }
}

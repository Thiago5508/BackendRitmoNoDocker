import type { Request, Response } from "express";
import {
  criarEvento,
  listarEventos,
  atualizarEvento,
  excluirEvento,
} from "../../services/events/event.service.js";

function validarDadosEvento(dados: any): boolean {
  return (
    typeof dados.data === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(dados.data) &&
    typeof dados.hora === "string" &&
    /^([01]\d|2[0-3]):([0-5]\d)$/.test(dados.hora) &&
    typeof dados.local === "string" &&
    dados.local.trim().length > 0 &&
    typeof dados.descricao === "string" &&
    dados.descricao.trim().length > 0 &&
    dados.descricao.length <= 500
  );
}

export async function criarEventoController(
  req: Request,
  res: Response
) {
  try {
    const empresaId = req.user.empresaId;

    const { data, hora, local, descricao } = req.body;

    if (
      !validarDadosEvento({
        data,
        hora,
        local,
        descricao,
      })
    ) {
      return res.status(400).json({
        message: "Preencha corretamente todos os campos do evento.",
      });
    }

    const evento = await criarEvento(empresaId, {
      data,
      hora,
      local: local.trim(),
      descricao: descricao.trim(),
    });

    return res.status(201).json(evento);
  } catch (error) {
    console.error("Erro ao criar evento:", error);

    return res.status(500).json({
      message: "Erro interno ao cadastrar evento.",
    });
  }
}

export async function listarEventosController(
  req: Request,
  res: Response
) {
  try {
    const empresaId = req.user.empresaId;

    const eventos = await listarEventos(empresaId);

    return res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro ao listar eventos:", error);

    return res.status(500).json({
      message: "Erro ao buscar eventos.",
    });
  }
}

export async function atualizarEventoController(
  req: Request,
  res: Response
) {
  try {
    const empresaId = req.user.empresaId;
    const { id } = req.params;

    const { data, hora, local, descricao } = req.body;

    if (
      !validarDadosEvento({
        data,
        hora,
        local,
        descricao,
      })
    ) {
      return res.status(400).json({
        message: "Preencha corretamente todos os campos do evento.",
      });
    }

    const evento = await atualizarEvento(id as string, empresaId, {
      data,
      hora,
      local: local.trim(),
      descricao: descricao.trim(),
    });

    if (!evento) {
      return res.status(404).json({
        message: "Evento não encontrado.",
      });
    }

    return res.status(200).json(evento);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);

    return res.status(500).json({
      message: "Erro ao atualizar evento.",
    });
  }
}

export async function excluirEventoController(
  req: Request,
  res: Response
) {
  try {
    const empresaId = req.user.empresaId;
    const { id } = req.params;

    const evento = await excluirEvento(id as string, empresaId);

    if (!evento) {
      return res.status(404).json({
        message: "Evento não encontrado.",
      });
    }

    return res.status(200).json({
      message: "Evento excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir evento:", error);

    return res.status(500).json({
      message: "Erro ao excluir evento.",
    });
  }
}
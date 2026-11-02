
import { isValidObjectId } from "mongoose";
import {RoutineModel} from "../../models/weekdays.model.js";
import { weekdays, type DiaSemana } from "../../types/weekdays.js";

type Nivel = "iniciante" | "intermediario" | "avancado";

function validarDiasSemana(dias: unknown): dias is DiaSemana[] {
  return (
    Array.isArray(dias) &&
    dias.length > 0 &&
    dias.every((dia) => weekdays.includes(dia)) &&
    new Set(dias).size === dias.length
  );
}

// Criar rotina
export async function criarRotina(
  empresaId: string,
  nivel: Nivel,
  diasSemana: DiaSemana[]
) {
  if (!validarDiasSemana(diasSemana)) {
    throw new Error("Informe dias válidos e sem duplicidade.");
  }

  const rotinaExistente = await RoutineModel.findOne({
    empresaId,
    nivel,
  });

  if (rotinaExistente) {
    throw new Error("Já existe uma rotina cadastrada para este nível.");
  }

  return await RoutineModel.create({
    empresaId,
    nivel,
    diasSemana,
  });
}

// Listar rotinas da empresa
export async function listarRotinas(empresaId: string) {
  return await RoutineModel.find({ empresaId }).sort({ nivel: 1 });
}

// Buscar rotina pelo nível do usuário
export async function buscarRotinaPorNivel(
  empresaId: string,
  nivel: Nivel
) {
  return await RoutineModel.findOne({
    empresaId,
    nivel,
  });
}

// Atualizar rotina
export async function atualizarRotina(
  rotinaId: string,
  empresaId: string,
  diasSemana: DiaSemana[]
) {
  if (!isValidObjectId(rotinaId)) {
    throw new Error("ID de rotina inválido.");
  }

  if (!validarDiasSemana(diasSemana)) {
    throw new Error("Informe dias válidos e sem duplicidade.");
  }

  const rotina = await RoutineModel.findOneAndUpdate(
    { _id: rotinaId, empresaId },
    { diasSemana },
    { new: true, runValidators: true }
  );

  if (!rotina) {
    throw new Error("Rotina não encontrada.");
  }

  return rotina;
}

// Excluir rotina
export async function excluirRotina(
  rotinaId: string,
  empresaId: string
) {
  if (!isValidObjectId(rotinaId)) {
    throw new Error("ID de rotina inválido.");
  }

  const rotina = await RoutineModel.findOneAndDelete({
    _id: rotinaId,
    empresaId,
  });

  if (!rotina) {
    throw new Error("Rotina não encontrada.");
  }

  return rotina;
}

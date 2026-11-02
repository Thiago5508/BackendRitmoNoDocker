
import { isValidObjectId } from "mongoose";
import { RoutineModel } from "../../models/weekdays.model.js";
import { weekdays, type DiaSemana } from "../../types/weekdays.js";

type Nivel = "iniciante" | "intermediario" | "avancado";

type TreinoDia = {
  icon: string;
  descricao: string;
};

type Treinos = Partial<Record<DiaSemana, TreinoDia>>;

function validarDiasSemana(dias: unknown): dias is DiaSemana[] {
  return (
    Array.isArray(dias) &&
    dias.length > 0 &&
    dias.every((dia) => weekdays.includes(dia)) &&
    new Set(dias).size === dias.length
  );
}

function validarTreinos(treinos: unknown): treinos is Treinos {
  if (
    typeof treinos !== "object" ||
    treinos === null ||
    Array.isArray(treinos)
  ) {
    return false;
  }

  return Object.entries(treinos).every(([dia, treino]) => {
    if (!weekdays.includes(dia as DiaSemana)) {
      return false;
    }

    if (
      typeof treino !== "object" ||
      treino === null ||
      Array.isArray(treino)
    ) {
      return false;
    }

    const item = treino as Record<string, unknown>;

    return (
      typeof item.icon === "string" &&
      item.icon.trim().length > 0 &&
      typeof item.descricao === "string"
    );
  });
}

// Criar rotina
export async function criarRotina(
  empresaId: string,
  nivel: Nivel,
  diasSemana: DiaSemana[],
  treinos: unknown = {}
) {
  if (!validarDiasSemana(diasSemana)) {
    throw new Error("Informe dias válidos e sem duplicidade.");
  }

  if (!validarTreinos(treinos)) {
    throw new Error("Os dados dos treinos são inválidos.");
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
    treinos,
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
  diasSemana: DiaSemana[],
  treinos?: unknown
) {
  if (!isValidObjectId(rotinaId)) {
    throw new Error("ID de rotina inválido.");
  }

  if (!validarDiasSemana(diasSemana)) {
    throw new Error("Informe dias válidos e sem duplicidade.");
  }

  const dadosAtualizacao: {
    diasSemana: DiaSemana[];
    treinos?: Treinos;
  } = {
    diasSemana,
  };

  // Só atualiza os treinos se o campo foi enviado
  if (treinos !== undefined) {
    if (!validarTreinos(treinos)) {
      throw new Error("Os dados dos treinos são inválidos.");
    }

    dadosAtualizacao.treinos = treinos;
  }

  const rotina = await RoutineModel.findOneAndUpdate(
    {
      _id: rotinaId,
      empresaId,
    },
    {
      $set: dadosAtualizacao,
    },
    {
      new: true,
      runValidators: true,
    }
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

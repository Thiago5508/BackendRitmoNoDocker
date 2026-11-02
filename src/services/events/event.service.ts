import EventModel from "../../models/events.model.js";

interface EventData {
  data: string;
  hora: string;
  local: string;
  descricao: string;
}

export async function criarEvento(
  empresaId: string,
  dados: EventData
) {
  return await EventModel.create({
    empresaId,
    ...dados,
  });
}

export async function listarEventos(empresaId: string) {
  return await EventModel.find({ empresaId }).sort({
    data: 1,
    hora: 1,
  });
}

export async function buscarEvento(
  eventoId: string,
  empresaId: string
) {
  return await EventModel.findOne({
    _id: eventoId,
    empresaId,
  });
}

export async function atualizarEvento(
  eventoId: string,
  empresaId: string,
  dados: EventData
) {
  return await EventModel.findOneAndUpdate(
    {
      _id: eventoId,
      empresaId,
    },
    {
      $set: dados,
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function excluirEvento(
  eventoId: string,
  empresaId: string
) {
  return await EventModel.findOneAndDelete({
    _id: eventoId,
    empresaId,
  });
}
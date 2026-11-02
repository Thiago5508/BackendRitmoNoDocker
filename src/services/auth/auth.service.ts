import jwt from "jsonwebtoken";

import { UserModel } from "../../models/user.model.js";
import { comparePassword } from "../../utils/password.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(
  telefone: string,
  senha: string
) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado");
  }

  const user = await UserModel
    .findOne({ telefone })
    .select("+senha");

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const passwordIsValid = await comparePassword(
    senha,
    user.senha
  );

  if (!passwordIsValid) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      empresaId: user.empresaId.toString(),
      isProfessor: user.isProfessor,
      nivel: user.nivel,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      superiorId: user.superiorId?.toString() ?? null,
      empresaId: user.empresaId.toString(),
      nome: user.nome,
      isProfessor: user.isProfessor,
      nivel: user.nivel,
      telefone: user.telefone,
    },
  };
}

export async function getAuthenticatedUser(userId: string) {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}
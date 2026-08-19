import type { CreateUserDTO, UpdateUserDTO } from "../../types/user.js";
import { Types } from "mongoose";
import { UserModel } from "../../models/user.model.js";
import { CompanyModel } from "../../models/company.model.js";
import { hashPassword } from "../../utils/password.js";

export async function getUsers(empresaId: string) {
  return UserModel.find({
    empresaId: new Types.ObjectId(empresaId),
  });
}

export async function getUserById(id: string) {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

export async function createUser(data: CreateUserDTO) {
  const companyExists = await CompanyModel.exists({
    _id: data.empresaId,
  });

  if (!companyExists) {
    throw new Error("Empresa não encontrada");
  }

  if (data.superiorId !== null) {
    const superiorExists = await UserModel.exists({
      _id: data.superiorId,
      empresaId: data.empresaId,
    });

    if (!superiorExists) {
      throw new Error("Usuário superior não encontrado");
    }
  }

  const hashedPassword = await hashPassword(data.senha);

  const user = await UserModel.create({
    empresaId: data.empresaId,
    superiorId: data.superiorId,
    nome: data.nome,
    isProfessor: data.isProfessor,
    nivel: data.nivel,
    telefone: data.telefone,
    senha: hashedPassword,
  });

  return user;
}

export async function updateUser(
  userId: string,
  empresaId: string,
  data: UpdateUserDTO
) {
  const user = await UserModel.findOneAndUpdate(
    {
      _id: userId,
      empresaId: new Types.ObjectId(empresaId),
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

export async function deleteUser(
  userId: string,
  empresaId: string
) {
  const user = await UserModel.findOneAndDelete({
    _id: userId,
    empresaId: new Types.ObjectId(empresaId),
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}
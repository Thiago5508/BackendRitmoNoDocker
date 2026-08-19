import type { Types } from "mongoose";

export type UserLevel =
  | "iniciante"
  | "intermediario"
  | "avancado";

export interface User {
  id: Types.ObjectId;
  empresaId: Types.ObjectId;
  superiorId: Types.ObjectId | null;
  nome: string;
  isProfessor: boolean;
  nivel: UserLevel;
  telefone: string;
  senha: string;
}

export interface CreateUserDTO {
  empresaId: Types.ObjectId;
  superiorId: Types.ObjectId | null;
  nome: string;
  isProfessor: boolean;
  nivel: UserLevel;
  telefone: string;
  senha: string;
}

export interface UpdateUserDTO {
  nome?: string;
  isProfessor?: boolean;
  nivel?: UserLevel;
  telefone?: string;
  superiorId?: string | null;
}
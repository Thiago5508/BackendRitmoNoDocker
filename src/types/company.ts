import type { Types } from "mongoose";

export interface Company {
  id: Types.ObjectId;
  nome: string;
}

export interface UpdateCompanyDTO {
  nome?: string;
}
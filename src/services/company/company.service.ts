import type { Types } from "mongoose";
import { CompanyModel } from "../../models/company.model.js";
import type { UpdateCompanyDTO } from "../../types/company.js";

export async function createCompany(nome: string) {
  const company = await CompanyModel.create({
    nome,
  });

  return company;
}

export async function getCompanies() {
  return CompanyModel.find().sort({ nome: 1 });
}

export async function getCompanyById(id: string) {
  const company = await CompanyModel.findById(id);

  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  return company;
}


export async function updateCompany(
  empresaId: string,
  data: UpdateCompanyDTO
) {
  const company = await CompanyModel.findOneAndUpdate(
    {
      _id: empresaId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  return company;
}

export async function deleteCompany(
  companyId: string,
) {
  const company = await CompanyModel.findOneAndDelete({
    _id: companyId,
  });

  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  return company;
}
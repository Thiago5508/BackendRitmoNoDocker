import type { Request, Response } from "express";

import {
  getCompanyById,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} from "../../services/company/company.service.js";

export async function getCompaniesController(
  _req: Request,
  res: Response
) {
  try {
    const companies = await getCompanies();

    res.json({
      companies
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor"
    });
  }
}

export async function getCompanyByIdController(
  req: Request,
  res: Response
) {
  try {
    const company = await getCompanyById(req.params.id as string);

    res.json({
      company
    });
  } catch (error) {
    res.status(404).json({
      message: "Empresa não encontrada"
    });
  }
}

export async function createCompanyController(
  req: Request,
  res: Response
) {
  try {
    const company = await createCompany(req.body.nome);

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor"
    });
  }
}


export async function updateCompanyController(
  req: Request,
  res: Response
) {
  try {

    const { empresaId  } = req.user!;

    const company = await updateCompany(
      empresaId,
      req.body
    );

    const companyResponse = company.toObject();

    res.status(200).json(companyResponse);
  } catch (error) {
    if (
      error instanceof Error &&
      (
        error.message === "Empresa não encontrada"
      )
    ) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function deleteCompanyController(
  req: Request,
  res: Response
) {
  try {
    await deleteCompany(req.params.id as string);

    res.status(200).send("Empresa deletada com sucesso");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Empresa não encontrada"
    ) {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
import type { Request, Response } from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
} from "../../services/users/user.service.js";

export async function getUsersController(
  req: Request,
  res: Response
) {
  try {
    const { empresaId } = req.user!;
    const users = await getUsers(empresaId);
    res.json({
      users
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor"
    });
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response
) {
  try {
    const user = await getUserById(req.params.id as string);

    res.json({
      user
    });
  } catch (error) {
    res.status(404).json({
      message: "Usuário não encontrado"
    });
  }
}

export async function createUserController(
  req: Request,
  res: Response
) {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Usuário não autenticado",
      });
      return;
    }

    const user = await createUser({
      ...req.body,
      empresaId: req.body.empresaId ?? req.user.empresaId,
    });

    const userResponse = user.toObject();

    const { senha, ...userWithoutPassword } = userResponse;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Empresa não encontrada"
    ) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "Usuário superior não encontrado"
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

export async function updateUserController(
  req: Request,
  res: Response
) {
  try {
    const { empresaId } = req.user!;

    const user = await updateUser(
      req.params.id as string,
      empresaId,
      req.body
    );

    const userResponse = user.toObject();

    const { senha, ...userWithoutPassword } = userResponse;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (
      error instanceof Error &&
      (
        error.message === "Usuário não encontrado" ||
        error.message === "Usuário superior não encontrado" ||
        error.message === "Telefone já cadastrado"
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

export async function deleteUserController(
  req: Request,
  res: Response
) {
  try {
    const { empresaId } = req.user!;

    await deleteUser(
      req.params.id as string,
      empresaId
    );

    res.status(200).send("Deletado com sucesso");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Usuário não encontrado"
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
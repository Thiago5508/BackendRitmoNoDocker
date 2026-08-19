import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthPayload } from "../types/auth.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Token não informado",
      });

      return;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      res.status(401).json({
        message: "Token inválido",
      });

      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      !("empresaId" in decoded)
    ) {
      res.status(401).json({
        message: "Token inválido",
      });

      return;
    }

    req.user = {
      userId: String(decoded.userId),
      empresaId: String(decoded.empresaId),
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}
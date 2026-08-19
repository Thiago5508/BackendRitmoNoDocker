import mongoose from "mongoose";

let databaseConnection: Promise<typeof mongoose> | undefined;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log("[DB] Conexão com o MongoDB já está estabelecida.");
    return mongoose;
  }

  const mongodbUri = process.env.MONGODB_URI?.trim();

  if (!mongodbUri) {
    throw new Error("MONGODB_URI não configurada");
  }

  databaseConnection ??= mongoose.connect(mongodbUri, {
    serverSelectionTimeoutMS: 5_000,
    connectTimeoutMS: 5_000,
  });

  try {
    await databaseConnection;
  } catch (error) {
    databaseConnection = undefined;
    console.error("Erro ao conectar ao MongoDB:", error);
    throw new Error("Não foi possível conectar ao MongoDB");
  }

  console.log("[DB] Conexão estabelecida com o MongoDB com sucesso.");

  return mongoose;
}
import mongoose from "mongoose";

let databaseConnection: Promise<typeof mongoose> | undefined;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI não configurada");
  }

  databaseConnection ??= mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10_000,
  });

  await databaseConnection;
  console.log("MongoDB conectado com sucesso!");

  return mongoose;
}
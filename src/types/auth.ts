export interface AuthPayload {
  userId: string;
  empresaId: string;
  isProfessor: boolean;
  nivel: "iniciante" | "intermediario" | "avancado";
}
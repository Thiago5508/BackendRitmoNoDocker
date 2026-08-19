import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
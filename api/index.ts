import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.js";

export default async function handler(
	req: Parameters<typeof app>[0],
	res: Parameters<typeof app>[1]
) {
	try {
		await connectDatabase();
		return app(req, res);
	} catch (error) {
		console.error("Falha na inicialização da API:", error);
		return res.status(503).json({
			message: "Banco de dados indisponível",
		});
	}
}
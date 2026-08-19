import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.js";

export default async function handler(
	req: Parameters<typeof app>[0],
	res: Parameters<typeof app>[1]
) {
	await connectDatabase();
	return app(req, res);
}
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

export const { PORT, MONGO_URL, PSW_EMAIL, EMAIL } = process.env;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { config } from "dotenv";
config();

export const { PORT, MONGO_URL } = process.env;

import { config } from "dotenv";
config();

export const BASE_URL = process.env.BASE_URL_API || "http://localhost:1000/"

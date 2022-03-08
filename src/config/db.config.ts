import dotenv from "dotenv";
dotenv.config()

export const HOST= process.env.DB_HOST ?? "localhost";
export const USER= process.env.DB_USER ?? "";
export const PASSWORD= process.env.DB_PASS ?? "";
export const DB=process.env.DB_NAME ?? "testdb"

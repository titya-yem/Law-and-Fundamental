import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

declare global {
  var pgPool: Pool | undefined;
}

const pool: Pool = globalThis.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

globalThis.pgPool = pool;

export default pool;
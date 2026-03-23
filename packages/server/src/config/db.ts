// db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
declare global {
  var pgPool: Pool | undefined;
}

let pool: Pool;

if (!globalThis.pgPool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  globalThis.pgPool = pool;
} else {
  pool = globalThis.pgPool;
}

export default pool;
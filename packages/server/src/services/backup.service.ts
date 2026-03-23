import { exec } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

// Use DATABASE_URL directly from env
const DATABASE_URL = process.env.DATABASE_URL;

export const createBackup = (format: "sql" | "dump" = "sql") => {
  return new Promise<{ filePath: string; fileName: string }>((resolve, reject) => {
    const timestamp = Date.now();
    const fileName =
      format === "dump"
        ? `backup-${timestamp}.dump`
        : `backup-${timestamp}.sql`;

    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

    const filePath = path.join(backupDir, fileName);

    // Use pg_dump with DATABASE_URL
    const baseCommand = `pg_dump "${DATABASE_URL}"`;

    const command =
      format === "dump"
        ? `${baseCommand} -F c -f "${filePath}"`
        : `${baseCommand} > "${filePath}"`;

    exec(command, (error) => {
      if (error) {
        console.error("pg_dump error:", error);
        return reject(error);
      }

      resolve({ filePath, fileName });
    });
  });
};
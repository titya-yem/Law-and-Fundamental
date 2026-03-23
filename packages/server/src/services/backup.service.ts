import { exec } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const DATABASE_URL = process.env.DATABASE_URL;

export const createBackup = (format: "sql" | "dump" = "sql") => {
  return new Promise<{ filePath: string; fileName: string }>((resolve, reject) => {
    const timestamp = Date.now();

    const fileName =
      format === "dump"
        ? `backup-${timestamp}.dump`
        : `backup-${timestamp}.sql`;

    const backupDir = path.join(process.cwd(), "backups");

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const filePath = path.join(backupDir, fileName);

    const pgDumpPath = `"C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe"`;

    const baseCommand = `${pgDumpPath} "${DATABASE_URL}" --no-owner --no-privileges`;

    const command =
      format === "dump"
        ? `${baseCommand} -F c -f "${filePath}"`
        : `${baseCommand} -f "${filePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ pg_dump error:", error);
        console.error("❌ stderr:", stderr);
        return reject(error);
      }

      console.log("✅ Backup success");
      resolve({ filePath, fileName });
    });
  });
};
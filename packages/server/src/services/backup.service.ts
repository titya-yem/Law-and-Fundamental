import { exec } from "node:child_process";
import path from "node:path";

export const createBackup = (format: "sql" | "dump" = "sql") => {
  return new Promise<{ filePath: string; fileName: string }>((resolve, reject) => {
    const timestamp = Date.now();
    const fileName =
      format === "dump" ? `backup-${timestamp}.dump` : `backup-${timestamp}.sql`;

    const filePath = path.join(process.cwd(), fileName);

    const command =
      format === "dump"
        ? `pg_dump -U postgres -d myapp -F c -f ${filePath}`
        : `pg_dump -U postgres -d myapp > ${filePath}`;

    exec(command, (error) => {
      if (error) return reject(error);

      resolve({ filePath, fileName });
    });
  });
};
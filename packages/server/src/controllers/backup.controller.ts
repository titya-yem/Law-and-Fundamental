import type { RequestHandler } from "express";
import fs from "node:fs";
import { backUpSchema } from "../validations/backup.validation";
import { createBackup } from "../services/backup.service";

export const downloadBackUp: RequestHandler = async (req, res) => {
  try {
    const { format } = backUpSchema.parse(req.query);

    const { filePath, fileName } = await createBackup(format);

    res.download(filePath, fileName, (error) => {
      if (error) console.error("Download error:", error);

      fs.unlink(filePath, (err) => {
        if (err) console.error("Cleanup error:", err);
      });
    });
  } catch (error) {
    console.error("Backup error:", error);
    if (!res.headersSent) res.status(500).json({ message: "Backup failed" });
  }
};
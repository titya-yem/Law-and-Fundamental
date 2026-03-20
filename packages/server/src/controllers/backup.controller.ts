import type { RequestHandler } from "express";
import { backUpSchema } from "../validations/backup.validation";
import { createBackup } from "../services/backup.service";
import fs from "node:fs";

export const downloadBackUp: RequestHandler = async (req, res) => {
    try {
        // validate query
        const parsed = backUpSchema.parse(req.query);
        const format = parsed.format || "sql";

        // create backup
        const { filePath, fileName } = await createBackup(format);

        // send file
        res.download(filePath, fileName, (error) => {
            if (error) console.log(error);

            fs.unlinkSync(filePath);
        });

    } catch (error: any) {
        console.error(error);
    res.status(500).json({ message: "Backup failed" });
    };
};
import type { RequestHandler } from "express";
import pool from "../config/db";

export const downloadBackUp: RequestHandler = async (req, res) => {
  try {
    // fetch all data
    const users = await pool.query("SELECT * FROM users");
    const cases = await pool.query("SELECT * FROM cases");

    const backup = {
      users: users.rows,
      cases: cases.rows,
      createdAt: new Date().toISOString(),
    };

    // force download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=backup.json"
    );
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error("❌ Backup error:", error);
    res.status(500).json({ message: "Backup failed" });
  }
};
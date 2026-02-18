import pool from "../config/db";

export const createCase = async (
    caseNumber: string,
    title: string,
    content: string,
    status: string,
    startDate: string,
    finishedDate?: string
) => {
    const result = await pool.query(
        `INSERT INTO cases (case_number, title, content, status, start_date, finished_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, case_number, title, content, status, start_date, finished_date`,
         [caseNumber, title, content, status, startDate, finishedDate || null]
    );

    return result.rows[0];
};

export const getCasesFromDB = async () => {
    const result = await pool.query(
        `SELECT * FROM cases`
    );

    return result.rows
}
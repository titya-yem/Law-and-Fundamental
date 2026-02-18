import type { RequestHandler } from "express";
import { caseSchema } from "../validations/case.validation";
import { createCase, getCasesFromDB } from "../models/case.model";

export const getCases: RequestHandler = async (req, res) => {
    try {
        const cases = await getCasesFromDB();

        res.status(200).json(cases)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const createCases: RequestHandler = async (req, res) => {
    try {
        const data = caseSchema.parse(req.body);
        
        const cases = await createCase(
            data.caseNumber,
            data.title,
            data.content,
            data.status,
            data.startDate,
            data.finishedDate
        );

        res.status(201).json(cases)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
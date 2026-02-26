import type { RequestHandler } from "express";
import { caseSchema } from "../validations/case.validation";
import { createCase, getCasesFromDB, updateCase } from "../models/case.model";

export const getCases: RequestHandler = async (req, res) => {
    try {
        const cases = await getCasesFromDB();
        res.status(200).json(cases);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const createCases: RequestHandler = async (req, res) => {
    try {
        const data = caseSchema.parse(req.body);

        const newCase = await createCase(
            data.caseNumber,
            data.title,
            data.content,
            data.status,
            data.startDate,
            data.finishedDate ?? undefined
        );

        res.status(201).json(newCase);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCases: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id))
            return res.status(400).json({ message: "Invalid case id" })

        const data = caseSchema.parse(req.body);

        const updatedCase = await updateCase(
            id,
            data.caseNumber,
            data.title,
            data.content,
            data.status,
            data.startDate,
            data.finishedDate ?? undefined
        );

        res.status(200).json(updatedCase);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
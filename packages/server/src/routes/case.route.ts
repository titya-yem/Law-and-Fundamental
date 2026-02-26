import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";
import { createCases, getCases, updateCases } from "../controllers/case.controller";

const router = Router();

router.get("/getAll", authenticate, getCases);
router.post("/create", authenticate, authorizeAdmin, createCases);
router.put("/update/:id", authenticate, authorizeAdmin, updateCases);
router.delete("/delete/:id", authenticate, authorizeAdmin, createCases);

export default router;
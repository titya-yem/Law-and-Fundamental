import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";
import { createCases, getCases } from "../controllers/case.controller";

const router = Router();

router.get("/getAll", authenticate, getCases);
router.post("/create", authenticate, authorizeAdmin, createCases);
router.put("/update/:id", authenticate, authorizeAdmin, createCases);
router.delete("/delete/:id", authenticate, authorizeAdmin, createCases);

export default router;
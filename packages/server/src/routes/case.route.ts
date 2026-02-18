import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";
import { createCases, getCases } from "../controllers/case.controller";

const router = Router();

router.get("/", authenticate, getCases);
router.post("/create", authenticate, authorizeAdmin, createCases);

export default router;
import { Router } from "express";
import { register, login, updateRole } from "../controllers/user.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/role", authenticate, authorizeAdmin, updateRole);
router.post("/register", register);
router.post("/login", login);

export default router;
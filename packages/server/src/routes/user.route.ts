import { Router } from "express";
import { register, login, updateRole, logout, getAll } from "../controllers/user.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req, res) => {
    res.json(req.user);
});
router.get("/",  authenticate, authorizeAdmin, getAll);

router.post("/role", authenticate, authorizeAdmin, updateRole);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
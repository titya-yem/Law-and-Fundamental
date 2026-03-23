import { Router } from "express";
import { register, login, updateUserHandler, logout, getAll, deleteUserHandler, getCurrentUser } from "../controllers/user.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me",  authenticate, getCurrentUser);

router.get("/",  authenticate, authorizeAdmin, getAll);

router.put("/:id", authenticate, authorizeAdmin, updateUserHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteUserHandler);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
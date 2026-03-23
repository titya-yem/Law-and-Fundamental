import { Router } from "express"
import { downloadBackUp } from "../controllers/backup.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, authorizeAdmin, downloadBackUp);

export default router;
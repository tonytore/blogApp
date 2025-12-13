import { sessionAuth } from "@/middleware/sessionAuth";
import { Router } from "express";
import { SessionController } from "./session.controller";

const router = Router();

router.post("/login", SessionController.login);
router.post("/logout", sessionAuth, SessionController.logout);
router.get("/active", sessionAuth, SessionController.listSessions);

export default router;

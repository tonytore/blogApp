import { SessionService } from "../module/session/session.service";
import { NextFunction, Request, Response } from "express";

export const sessionAuth = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.headers["x-session-id"];
    if (!sessionId) {
        return res.status(401).json({ message: "Session ID missing" });
    }

    const session = await SessionService.findSession(String(sessionId));
    if (!session) {
        return res.status(401).json({ message: "Invalid or expired session" });
    }

    // Attach user info to request for controllers
    req.sessionId = session.id;
    req.userId = session.user_id!;

    // Update last activity timestamp
    await SessionService.updateLastActivity(session.id);

    next();
};

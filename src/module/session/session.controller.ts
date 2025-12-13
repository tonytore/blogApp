import crypto from "crypto";
import { Request, Response } from "express";
import { SessionService } from "./session.service";
import { getByEmailService } from "../user/user.service";

export const SessionController = {

    login: async (req: Request, res: Response) => {
        const { email, password, ip_address } = req.body;
        const user_agent = req.headers["user-agent"];
        const user = await getByEmailService(email);

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const sessionId = crypto.randomUUID();

        const session = await SessionService.createSession({
            id: sessionId,
            user_id: user.id,
            ip_address: ip_address,
            user_agent: user_agent!,
            payload: JSON.stringify({ loggedIn: true }),
            last_activity: Math.floor(Date.now() / 1000)
        });

        res.json({ message: "Login successful", session });
    },

    logout: async (req: Request, res: Response) => {
        const sessionId = req.headers["x-session-id"];
        await SessionService.deleteSession(String(sessionId));
        res.json({ message: "Logged out successfully" });
    },

    listSessions: async (req: Request, res: Response) => {
        const userId = req.headers["x-user-id"];
        const sessions = await SessionService.findUserSessions(String(userId));
        res.json(sessions);
    }
};

import { db } from "@/config/db"
import { getByEmailService } from "../user/user.service"
import appConfig from "@/config/app_configs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { successResponse } from "@/utils/helper/response_helper"
import { createOrUpdateToken, deleteToken, findToken } from "./passwordReset.service"

export const passResetController = {
    requestReset: async (req: Request, res: Response) => {
        const { email } = req.body
        const user = await getByEmailService(email)
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        const token = jwt.sign({ user }, appConfig.ACCESS_TOKEN_SECRET!, {
            expiresIn: appConfig.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
        });

        await createOrUpdateToken(email,token)

        return successResponse(res, "Password reset generated successfully", token);

    },
    verifyToken: async (req: Request, res: Response) => {
        const { email, token } = req.body
        const stored = await findToken(email)
        if (!stored || stored.token !== token) {
            return res.status(404).json({ message: "Token is invalid" });
        }

        return successResponse(res, "Token is valid", token);
    },
    resetPassword: async (req: Request, res: Response) => {
            const { email, token, new_password } = req.body
            const stored = await findToken(email)
            if (!stored || stored.token !== token) {
                return res.status(404).json({ message: "Token is invalid" });
            }

            const hashedPassword = await bcrypt.hash(new_password, 10);

            const updatePassword = await db.user.update({
                where: { email: stored?.email },
                data: { password: hashedPassword },
            });
            await deleteToken(email)

            return successResponse(res, "User Password updated", updatePassword);

    },
}
import { Router } from "express";
import { passResetController } from "./passwordReset.controller";

const resetPassRoute = Router();


resetPassRoute.post('/request', passResetController.requestReset)
resetPassRoute.post('/verify', passResetController.verifyToken)
resetPassRoute.post('/reset', passResetController.resetPassword)
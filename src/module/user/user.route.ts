import { Router } from "express";
import userControllers from "./user.controllers";
import { authenticateToken } from "@/middleware/authenticator";

export const userRouter = Router();

userRouter.get("/", authenticateToken, userControllers.listUser);
userRouter.post("/signup", userControllers.createUser);
userRouter.post("/login", userControllers.loginUser);
userRouter.get("/:email", userControllers.getByEmail);
userRouter.put("/:id", authenticateToken, userControllers.updateUser);
userRouter.put("/update-password/:id", authenticateToken, userControllers.updateUserPasswordById);
userRouter.delete("/:id", authenticateToken, userControllers.deleteUser);

import { Router } from "express";
import userControllers from "./user.controllers";


export const userRouter = Router();

userRouter.get("/", userControllers.listUser);
userRouter.post("/", userControllers.createUser);
userRouter.put("/:id", userControllers.updateUser);
userRouter.put("/update-password/:id", userControllers.updateUserPasswordById);
userRouter.delete("/:id", userControllers.deleteUser);

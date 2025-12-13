import { Router } from "express";
import commentControllers from "./comment.controller";
import { authenticateToken } from "@/middleware/authenticator";

const commentRouter = Router();

commentRouter.get("/",authenticateToken, commentControllers.listComment);

commentRouter.post("/",authenticateToken, commentControllers.createComment);

commentRouter.put("/:id",authenticateToken, commentControllers.updateComment);

commentRouter.delete("/:id",authenticateToken, commentControllers.deleteComment);

export default commentRouter;

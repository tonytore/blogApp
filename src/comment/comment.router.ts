import { Router } from "express";
import commentControllers from "./comment.controller";

const commentRouter = Router();

commentRouter.get("/", commentControllers.listComment);

commentRouter.post("/", commentControllers.createComment);

commentRouter.put("/", commentControllers.updateComment);

commentRouter.delete("/", commentControllers.deleteComment);

export default commentRouter;

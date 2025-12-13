import { Router } from "express";
import postControllers from "./post.controllers";
import { authenticateToken } from "@/middleware/authenticator";

export const postRouter = Router();

postRouter.get("/", authenticateToken, postControllers.listPosts);
postRouter.get("/:id", authenticateToken, postControllers.getPostById);
postRouter.post("/", authenticateToken, postControllers.createPosts);
postRouter.put("/:id", authenticateToken, postControllers.updatePosts);
postRouter.delete("/:id", authenticateToken, postControllers.deletePosts);
postRouter.post("/:id", authenticateToken, postControllers.connectPostToTag);

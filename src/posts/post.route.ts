import { Router } from "express";
import postControllers from "./post.controllers";

export const postRouter = Router();

postRouter.get("/", postControllers.listPosts);
postRouter.get("/:id", postControllers.getPostById);
postRouter.post("/", postControllers.createPosts);
postRouter.put("/:id", postControllers.updatePosts);
postRouter.delete("/:id", postControllers.deletePosts);
postRouter.post("/:id", postControllers.connectPostToTag);

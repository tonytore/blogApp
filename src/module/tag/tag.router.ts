import { Router } from "express";
import tagControllers from "./tag.controller";
import { authenticateToken } from "@/middleware/authenticator";

const tagRouter = Router();

tagRouter.get("/",authenticateToken, tagControllers.listTag);

tagRouter.post("/",authenticateToken, tagControllers.createTag);

tagRouter.put("/:id",authenticateToken, tagControllers.updateTag);

tagRouter.delete("/:id",authenticateToken, tagControllers.deleteTag);

export default tagRouter;

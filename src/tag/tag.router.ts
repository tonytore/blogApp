import { Router } from "express";
import tagControllers from "./tag.controller";

const tagRouter = Router();

tagRouter.get("/", tagControllers.listTag);

tagRouter.post("/", tagControllers.createTag);

tagRouter.put("/", tagControllers.updateTag);

tagRouter.delete("/", tagControllers.deleteTag);

export default tagRouter;

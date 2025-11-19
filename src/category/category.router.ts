import { Router } from "express";
import categoryControllers from "./category.controller";

const categoryRouter = Router();

categoryRouter.get("/", categoryControllers.listCategory);

categoryRouter.post("/", categoryControllers.createCategory);

categoryRouter.put("/:id", categoryControllers.updateCategory);

categoryRouter.delete("/:id", categoryControllers.deleteCategory);

export default categoryRouter;

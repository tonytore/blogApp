import { Router } from "express";
import categoryControllers from "./category.controller";
import { authenticateToken } from "@/middleware/authenticator";

const categoryRouter = Router();

categoryRouter.get("/", authenticateToken, categoryControllers.listCategory);

categoryRouter.post("/", authenticateToken, categoryControllers.createCategory);

categoryRouter.put("/:id", authenticateToken, categoryControllers.updateCategory);

categoryRouter.delete("/:id", authenticateToken, categoryControllers.deleteCategory);

export default categoryRouter;

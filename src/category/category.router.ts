import { Request, Response, Router } from "express";
import categoryControllers from "./category.controller";

const categoryRouter = Router();


categoryRouter.get('/',categoryControllers.listCategory)

categoryRouter.post('/',categoryControllers.createCategory)

categoryRouter.put('/',categoryControllers.updateCategory)

categoryRouter.delete('/',categoryControllers.deleteCategory)

export default categoryRouter
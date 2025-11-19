import { Request, Response } from "express";
import * as svc from "./category.service";
import { successResponse } from "@/utils/helper/response_helper";

const categoryControllers = {
  listCategory: (req: Request, res: Response) => {
    try {
      const category = svc.listCategoryService();

      return successResponse(res, "Category List", category);
    } catch (error) {
      console.error(error);
    }
  },
  createCategory: (req: Request, res: Response) => {
    const { name } = req.body;

    const createCategory = svc.createCategory({ name });
    return successResponse(res, "Category Created", createCategory);
  },
  updateCategory: (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = svc.updateCategory({ id, name });

    return successResponse(res, "Category Updated", updatedCategory);
  },

  deleteCategory: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteCategory = svc.deleteCategoryService(id);

    return successResponse(res, "Category Deleted", deleteCategory);
  },
};

export default categoryControllers;

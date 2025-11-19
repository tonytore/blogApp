import { Request, Response } from "express";
import * as svc from "./category.service";
import { successResponse } from "@/utils/helper/response_helper";
import { generateSlug } from "@/utils/generateSlug";

const categoryControllers = {
  listCategory: async(req: Request, res: Response) => {
    try {
      const category = await svc.listCategoryService();

      return successResponse(res, "Category List", category);
    } catch (error) {
      console.error(error);
    }
  },
  createCategory: async(req: Request, res: Response) => {
    const { name } = req.body;

    const createCategory = await svc.createCategory({ name, slug:generateSlug(name)});
    return successResponse(res, "Category Created", createCategory);
  },
  updateCategory: async(req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await svc.updateCategory({ id, name });

    return successResponse(res, "Category Updated", updatedCategory);
  },

  deleteCategory: async(req: Request, res: Response) => {
    const { id } = req.params;
    const deleteCategory = await svc.deleteCategoryService(id);

    return successResponse(res, "Category Deleted", deleteCategory);
  },
};

export default categoryControllers;

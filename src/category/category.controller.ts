import { Request, Response } from "express";
import * as svc from "./category.service";
import { successResponse } from "@/utils/helper/response_helper";
import { generateSlug } from "@/utils/generateSlug";
import { catchAsync } from "@/utils/catchAsync";

const categoryControllers = {
  listCategory: catchAsync(async (req: Request, res: Response) => {
    const category = await svc.listCategoryService();

    return successResponse(res, "Category List", category);
  }),
  createCategory: catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;

    const createCategory = await svc.createCategory({
      name,
      slug: generateSlug(name),
    });
    return successResponse(res, "Category Created", createCategory);
  }),
  updateCategory: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await svc.updateCategory({ id, name });

    return successResponse(res, "Category Updated", updatedCategory);
  }),

  deleteCategory: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteCategory = await svc.deleteCategoryService(id);

    return successResponse(res, "Category Deleted", deleteCategory);
  }),
};

export default categoryControllers;

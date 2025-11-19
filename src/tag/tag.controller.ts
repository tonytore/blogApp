import { Request, Response } from "express";
import * as svc from "./tag.service";
import { errorResponse, successResponse } from "@/utils/helper/response_helper";
import { generateSlug } from "@/utils/generateSlug";

const tagControllers = {
  listTag: async(req: Request, res: Response) => {
    try {
      const tag = await svc.listTagService();

      return successResponse(res, "Tag List", tag);
    } catch (error) {
      return errorResponse(res, 'error', error)
    }
  },
  createTag: async(req: Request, res: Response) => {
    const { name } = req.body;

    const createTag = await svc.createTag({ name,slug:generateSlug(name) });
    return successResponse(res, "Tag Created", createTag);
  },
  updateTag: async(req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTag = await svc.updateTag({ id, name });

    return successResponse(res, "Tag Updated", updatedTag);
  },

  deleteTag: async(req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTag = await svc.deleteTagService(id);

    return successResponse(res, "Tag Deleted", deleteTag);
  },
};

export default tagControllers;

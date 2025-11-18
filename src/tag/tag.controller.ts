import { Request, Response } from "express";
import * as svc from "./tag.service";
import { successResponse } from "../utils/helper/response_helper";


const tagControllers = {
  listTag: (req:Request,res:Response)=>{
    try {
    const tag =  svc.listTagService();

    return successResponse(res, 'Tag List', tag);
    } catch (error) {
        console.error(error)
    }
},
  createTag: (req:Request,res:Response)=>{
      const { name } = req.body
  
      const createTag =  svc.createTag({name})
      return successResponse(res, 'Tag Created', createTag);
  },
  updateTag: (req:Request,res:Response)=>{
    const { id } = req.params
    const { name } = req.body
    const updatedTag = svc.updateTag({ id, name })

    return successResponse(res, 'Tag Updated', updatedTag);
  },

  deleteTag: (req:Request,res:Response) => {
    const { id } = req.params
    const deleteTag =  svc.deleteTagService(id);

    return successResponse(res, 'Tag Deleted', deleteTag);
  },
};

export default tagControllers;

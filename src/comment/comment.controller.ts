import { Request, Response } from "express";
import * as svc from "./comment.service";


const commentControllers = {
  listComment: (req:Request,res:Response)=>{
    try {
    const comment =  svc.listCommentService();

    return res.status(200).json(comment);
    } catch (error) {
        
    }
},
  createComment: (req:Request,res:Response)=>{
      const { text, postId, authorId, isPublic } = req.body
  
      const createComment =  svc.createComment({text,postId,authorId,isPublic})
      return res.status(200).json(createComment)
  },
  updateComment: (req:Request,res:Response)=>{
    const { id } = req.params
    const { text } = req.body
    const updatedComment = svc.updateComment({ id, text })

    return res.status(200).json(updatedComment)
  },

  deleteComment: (req:Request,res:Response) => {
    const { id } = req.params
    const deleteComment =  svc.deleteCommentService(id);

    return res.status(200).json(deleteComment)
  },
};

export default commentControllers;

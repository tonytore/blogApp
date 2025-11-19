import { Request, Response } from "express";
import * as svc from "./comment.service";
import { successResponse } from "@/utils/helper/response_helper";

const commentControllers = {
  listComment: (req: Request, res: Response) => {
    try {
      const comment = svc.listCommentService();

      return successResponse(res, "Comment List", comment);
    } catch (error) {
      console.error(error);
    }
  },
  createComment: (req: Request, res: Response) => {
    const { text, postId, authorId, isPublic } = req.body;

    const createComment = svc.createComment({
      text,
      postId,
      authorId,
      isPublic,
    });
    return successResponse(res, "Comment Created", createComment);
  },
  updateComment: (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = svc.updateComment({ id, text });

    return successResponse(res, "Comment Updated", updatedComment);
  },

  deleteComment: (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteComment = svc.deleteCommentService(id);

    return successResponse(res, "Comment Deleted", deleteComment);
  },
};

export default commentControllers;

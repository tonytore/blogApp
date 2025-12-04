import { Request, Response } from "express";
import * as svc from "./comment.service";
import { successResponse } from "@/utils/helper/response_helper";
import { catchAsync } from "@/utils/catchAsync";

const commentControllers = {
  listComment: catchAsync(async (req: Request, res: Response) => {
    const comment = await svc.listCommentService();

    return successResponse(res, "Comment List", comment);
  }),
  createComment: catchAsync(async (req: Request, res: Response) => {
    const { text, postId, authorId, isPublic } = req.body;

    const createComment = await svc.createComment({
      text,
      postId,
      authorId,
      isPublic,
    });
    return successResponse(res, "Comment Created", createComment);
  }),
  updateComment: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = await svc.updateComment({ id, text });

    return successResponse(res, "Comment Updated", updatedComment);
  }),

  deleteComment: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteComment = await svc.deleteCommentService(id);

    return successResponse(res, "Comment Deleted", deleteComment);
  }),
};

export default commentControllers;

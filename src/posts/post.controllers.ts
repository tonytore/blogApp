import { Request, Response } from "express";
import * as svc from "../posts/post.service";
import { generateSlug } from "@/utils/generateSlug";
import { successResponse } from "@/utils/helper/response_helper";
import { catchAsync } from "@/utils/catchAsync";
import { db } from "@/config/db";

const postControllers = {
  listPosts: catchAsync(async (req: Request, res: Response) => {
    const post = await svc.getPostService();
    return res.status(200).json(post);

  }),
  getPostById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await svc.getPostServiceById(id);
    return res.status(200).json(post);
  }),
  createPosts: catchAsync(async (req: Request, res: Response) => {
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;

    const posts = await svc.createPostService({
      title,
      slug: generateSlug(title),
      excerpt,
      content,
      status,
      authorId,
      categoryId,
      views,
    });
    return successResponse(res, "Post Created", posts, 201);

  }),

  updatePosts: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;

    const post = await svc.updatePostService({
      id,
      title,
      excerpt,
      content,
      status,
      authorId,
      categoryId,
      views,
    });
    return successResponse(res, "Post Updated", post);

  }),

  deletePosts: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await svc.deletePostService(id);
    return successResponse(res, "Post Deleted", post);

  }),

  connectPostToTag: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tagId } = req.body;
    const result = await db.post.update({
      where: {
        id
      },
      data: {
        tags: {
          connect: {
            id: tagId
          }

        }
      }
    })
    return successResponse(res, "Post Connected to Tag", result);
  }),


};
export default postControllers;

import { Request, Response } from "express";
import * as svc from "../posts/post.service";
import { generateSlug } from "@/utils/generateSlug";
import { successResponse } from "@/utils/helper/response_helper";

const postControllers = {
  listPosts: async(req: Request, res: Response) => {
    try {
      const post = await svc.getPostService();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  },
  createPosts: async (req: Request, res: Response) => {
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;
    try {
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
    } catch (error) {
      console.log(error);
    }
  },

  updatePosts: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;
    try {
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
    } catch (error) {
      console.log(error);
    }
  },

  deletePosts: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = await svc.deletePostService(id);
      return successResponse(res, "Post Deleted", post);
    } catch (error) {
      console.log(error);
    }
  },
};
export default postControllers;

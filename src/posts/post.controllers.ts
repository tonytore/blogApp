import { Request, Response } from "express";
import * as svc from "../posts/post.service";
import { generateSlug } from "../../utils/generateSlug";
import { successResponse } from "../utils/helper/response_helper";

const postControllers = {
  listPosts:  (req: Request, res: Response) => {
    try {
      const post =  svc.getPostService();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  },
  createPosts:  async(req: Request, res: Response) => {
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;
    try {
      const posts = svc.createPostService({
        title,
        slug: generateSlug(title),
        excerpt,
        content,
        status,
        authorId,
        categoryId,
        views,
      });
      return successResponse(res, 'Post Created', posts,201);
    } catch (error) {
      console.log(error);
    }
  },

  updatePosts: (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, excerpt, content, status, authorId, categoryId, views } =
      req.body;
    try {
      const post = svc.updatePostService({
        id,
        title,
        excerpt,
        content,
        status,
        authorId,
        categoryId,
        views,
      });
      return successResponse(res, 'Post Updated', post);
    } catch (error) {
      console.log(error);
    }
  },

  deletePosts:  (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const post = svc.deletePostService(id);
      return successResponse(res, 'Post Deleted', post);
    } catch (error) {
      console.log(error);
    }
  },
};
export default postControllers;

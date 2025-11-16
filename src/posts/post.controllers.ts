import { Request, Response } from "express";
import * as svc from "../posts/post.service";
import { generateSlug } from "../../utils/generateSlug";

const postControllers = {
  listPosts:  (req: Request, res: Response) => {
    try {
      const post =  svc.getPostService();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  },
  createPosts:  (req: Request, res: Response) => {
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
      return res.status(200).json(posts);
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
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  },

  deletePosts:  (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = svc.deletePostService(id);
      return res.status(200).json("post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  },
};
export default postControllers;

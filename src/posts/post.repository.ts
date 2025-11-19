import { db } from "../config/db";
import { createPostPayload, updatePostPayload } from "./post.service";

export async function listPostRepository() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        category: true,
        comments: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getPostBySlug(slug: string){
  const c = await db.post.findUnique({
   where: {slug}
  })

  return c
}

export async function createPostRepository({
  title,
  slug,
  excerpt,
  content,
  status,
  authorId,
  categoryId,
  views,
}: createPostPayload) {
  try {
    const newPost = await db.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        status,
        authorId,
        categoryId,
        views,
      },
    });
    return newPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePostRepository({
  id,
  title,
  excerpt,
  content,
  status,
  authorId,
  categoryId,
  views,
}: updatePostPayload) {
  try {
    const updatedPost = await db.post.update({
      where: { id },
      data: { title, excerpt, content, status, authorId, categoryId, views },
    });
    return updatedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePostRepository(id: string) {
  const deletedPost = await db.post.delete({
    where: { id },
  });

  return deletedPost;
}

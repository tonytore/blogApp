import { PostStatus } from "@prisma/client";
import * as repo from "../posts/post.repository";
import { generateSlug } from "../utils/generateSlug";

export interface createPostPayload {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  status: PostStatus;
  authorId?: string | null;
  categoryId?: string | null;
  views: number;
}

export interface updatePostPayload {
  id: string;
  title: string;
  excerpt?: string | null;
  content: string;
  status: PostStatus;
  authorId?: string | null;
  categoryId?: string | null;
  views: number;
}

export async function getPostService() {
  return repo.listPostRepository();
}

export async function createPostService({
  title,
  excerpt,
  content,
  status,
  authorId,
  categoryId,
  views,
}: createPostPayload) {
  const slug = generateSlug(title);
  return repo.createPostRepository({
    title,
    slug,
    excerpt,
    content,
    status,
    authorId,
    categoryId,
    views,
  });
}

export async function updatePostService({
  id,
  title,
  excerpt,
  content,
  status,
  authorId,
  categoryId,
  views,
}: updatePostPayload) {
  return repo.updatePostRepository({
    id,
    title,
    excerpt,
    content,
    status,
    authorId,
    categoryId,
    views,
  });
}

export async function deletePostService(id: string) {
  return repo.deletePostRepository(id);
}

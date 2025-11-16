import { db } from "../../prisma/db";
import { createCommentPayload, updateCommentPayload } from "./comment.service";

export async function listCommentRepository() {
  const posts = await db.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      post: true,
    },
  });
  return posts;
}

export async function createCommentRepository({
  text,
  postId,
  authorId,
  isPublic,
}: createCommentPayload) {
  const comment = await db.comment.create({
    data: {
      text,
      postId,
      authorId,
      isPublic,
    },
  });
  return comment;
}

export async function updateCommentRepository({
  id,
  text,
}: updateCommentPayload) {
  const comment = await db.comment.update({
    where: {
      id,
    },
    data: {
      text,
    },
  });
  return comment;
}

export async function deleteCommentRepository(id: string) {
  const deletedComment = await db.comment.delete({
    where: { id },
  });

  return deletedComment;
}

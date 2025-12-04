import { db } from "../config/db";
import { createTagPayload, updateTagPayload } from "./tag.service";

export async function listTagRepository() {
  const tags = await db.tag.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      posts: true,
    },
  });
  return tags;
}

export async function getTagBySlug(slug: string) {
  const c = await db.tag.findUnique({
    where: { slug },
  });

  return c;
}

export async function createTagRepository({ name, slug }: createTagPayload) {
  const tag = await db.tag.create({
    data: {
      name,
      slug,
    },
  });
  return tag;
}

export async function updateTagRepository({ id, name }: updateTagPayload) {
  const tag = await db.tag.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return tag;
}

export async function deleteTagRepository(id: string) {
  const deletedTag = await db.tag.delete({
    where: { id },
  });

  return deletedTag;
}

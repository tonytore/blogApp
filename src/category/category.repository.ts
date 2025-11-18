import { generateSlug } from "@/utils/generateSlug";
import { db } from "../config/db";
import { createCategoryPayload, updateCategoryPayload } from "./category.service";

export async function listCategoryRepository() {
  const posts = await db.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: true,
    },
  });
  return posts;
}

export async function createCategoryRepository({
 name,
}: createCategoryPayload) {
  const category = await db.category.create({
    data: {
      name,
      slug:generateSlug(name)
    },
  });
  return category;
}

export async function updateCategoryRepository({
  id,
  name,
}: updateCategoryPayload) {
  const category = await db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return category;
}

export async function deleteCategoryRepository(id: string) {
  const deletedCategory = await db.category.delete({
    where: { id },
  });

  return deletedCategory;
}

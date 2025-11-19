import * as repo from "./tag.repository";

export type createTagPayload = {
  name: string;
  slug: string
};

export type updateTagPayload = {
  id: string;
  name: string;
};

export async function listTagService() {
  return repo.listTagRepository();
}

export async function createTag({ name,slug }: createTagPayload) {
  const existingTag = await repo.getTagBySlug(slug);
  if (existingTag) {
    throw new Error(`Tag with slug "${slug}" already exists`);
  }
  return repo.createTagRepository({ name, slug });
}

export async function updateTag({ id, name }: updateTagPayload) {
  return repo.updateTagRepository({ id, name });
}

export async function deleteTagService(id: string) {
  return repo.deleteTagRepository(id);
}

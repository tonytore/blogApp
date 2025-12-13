import * as repo from "@/module/user/user.repository";

export interface userData {
  email: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  password: string;
}
export interface updateUserData {
  id: string;
  email: string;
  password: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
}
export async function getUserService() {
  return repo.listUserRepository();
}

export async function createUserService({
  email,
  password,
  name,
  bio,
  avatarUrl,
}: userData) {
  return repo.createUserRepository({ email, password, name, bio, avatarUrl });
}

export async function getByEmailService(email: string) {
  return repo.getByEmailRepository(email);
}

export async function loginUserService({ email, password }: userData) {
  return repo.loginUserRepository({ email, password });
}

export async function updateUserService({
  id,
  email,
  password,
  name,
  bio,
  avatarUrl,
}: updateUserData) {
  return repo.updateUserRepository({
    id,
    email,
    password,
    name,
    bio,
    avatarUrl,
  });
}

export async function deleteUserService(id: string) {
  return repo.deleteUserRepository(id);
}

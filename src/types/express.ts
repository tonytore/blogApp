import { ROLE } from "./role.js";

export type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  role: ROLE;
};

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

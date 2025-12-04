import { Request, Response } from "express";
import * as svc from "../user/user.service";
import bcrypt from "bcrypt";
import { db } from "../config/db";
import { successResponse } from "@/utils/helper/response_helper";
import { catchAsync } from "@/utils/catchAsync";

const userControllers = {
  listUser: catchAsync(async (req: Request, res: Response) => {
    const user = await svc.getUserService();
    return successResponse(res, "User List", user);
  }),
  createUser: catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await svc.createUserService({ email, password });
    return successResponse(res, "User Created", user, 201);
  }),
  loginUser: catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await svc.loginUserService({ email, password });
    return successResponse(res, "User Logged In", user);
  }),
  updateUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password, name, bio, avatarUrl } = req.body;

    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).send({
        data: null,
        mas: "user not found",
      });
    }
    const user = await svc.updateUserService({
      id,
      email,
      password,
      name,
      bio,
      avatarUrl,
    });
    const { password: _pass, ...other } = user;
    void _pass;
    return successResponse(res, "User Updated", other);
  }),

  updateUserPasswordById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).send({
        data: null,
        mas: "user not found",
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const updatePassword = await db.user.update({
      where: { email: user?.email },
      data: { password: hashedPassword },
    });

    return successResponse(res, "User Password updated", updatePassword);
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await svc.deleteUserService(id);
    return successResponse(res, "User Deleted", user);
  }),
};
export default userControllers;

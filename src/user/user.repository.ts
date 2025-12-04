import jwt from "jsonwebtoken";
import appConfig from "@/config/app_configs";
import { db } from "../config/db";
import { updateUserData, userData } from "./user.service";
import bcrypt from "bcrypt";
import { UnauthenticatedError } from "@/utils/error/custom_error_handler";

export async function listUserRepository() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredUsers = await users.map((user) => {
      const { password: _password, ...other } = user;
      void _password;
      return other;
    });
    return filteredUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUserRepository({
  email,
  password,
  name,
  bio,
  avatarUrl,
}: userData) {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      omit: { password: true },
      data: { email, password: hashedPassword, name, bio, avatarUrl },
    });
    const accessToken = jwt.sign(
      { user: newUser },
      appConfig.ACCESS_TOKEN_SECRET!,
      {
        expiresIn:
          appConfig.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
      },
    );

    return { newUser, accessToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUserRepository({ email, password }: userData) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthenticatedError("error.invalidCredentials", "AuthService");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthenticatedError("error.invalidCredentials", "AuthService");
    }

    const token = jwt.sign({ user }, appConfig.ACCESS_TOKEN_SECRET!, {
      expiresIn: appConfig.ACCESS_TOKEN_EXPIRES_IN as any,
    });
    const { password: _password, ...other } = user;
    void password;
    return { ...other, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserRepository({
  id,
  email,
  password,
  name,
  bio,
  avatarUrl,
}: updateUserData) {
  try {
    const updatedUser = await db.user.update({
      where: { id },
      data: { email, password, name, bio, avatarUrl },
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUserRepository(id: string) {
  const deletedUser = await db.user.delete({
    where: { id },
  });

  return deletedUser;
}

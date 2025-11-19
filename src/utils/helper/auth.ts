import jwt from "jsonwebtoken";
import appConfig from "@/config/app_configs";
import { UnauthenticatedError } from "@/utils/error/custom_error_handler.js";
import { User } from "@/types/express.js";

const { ACCESS_TOKEN_SECRET } = appConfig;

export function verifyAccessToken(token: string): User {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET!) as { user: User };
    if (!payload.user) throw new Error("No user in token");
    return payload.user;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new UnauthenticatedError(
      "Invalid or expired token",
      "verifyAccessToken",
      { originalError: errorMessage },
    );
  }
}

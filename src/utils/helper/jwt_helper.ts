import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ForbiddenError } from "../error/custom_error_handler.js";

dotenv.config();

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = process.env as { [key: string]: string };

export class JwtService {
  getAuthTokens(payload: object): AuthTokens {
    const accessToken = this.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    });
    const refreshToken = this.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
    });
    return { accessToken, refreshToken };
  }
  async verify(token: string, secret: string): Promise<jwt.JwtPayload> {
    const decoded: jwt.JwtPayload = await new Promise((resolve, reject) => {
      const callback: jwt.VerifyCallback = (
        err: jwt.VerifyErrors | null,
        decoded: jwt.JwtPayload | string | undefined,
      ) => {
        if (err) {
          reject(new ForbiddenError("You do not have permission", "Forbidden"));
        } else {
          resolve(decoded as jwt.JwtPayload);
        }
      };
      jwt.verify(token, secret, callback);
    });
    return decoded;
  }
  sign(payload: object, secret: string, options?: jwt.SignOptions): string {
    return jwt.sign(payload, secret, options);
  }
}

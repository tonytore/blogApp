import { UnauthenticatedError } from "@/utils/error/custom_error_handler";
import { verifyAccessToken } from "@/utils/helper/auth";
import { Request,Response,NextFunction } from "express";

export const authenticateToken = (req:Request,_res:Response,next:NextFunction)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        throw new UnauthenticatedError(
      'Please log in to access this resource',
      'AuthMiddleware',
    );
    }
    try {
    const payload = verifyAccessToken(token)
    const user = payload
    req.user = user
    next()
    } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';

    throw new UnauthenticatedError(
      'Your session has expired. Please log in again',
      'AuthMiddleware',
      {
        originalError: errorMessage,
      },
    );
  }
    
}
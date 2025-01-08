// core
import jwt, { Secret, JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// utils
import { cleanCookie, handleDefaultErr, serverError } from "../utils";

// load env
dotenv.config();

export interface CustomRequest extends Request {
  decoded?: string | JwtPayload | undefined;
}

export const verifyAccessToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;

    // no cookie
    if (!cookies.accessToken) {
      return res.send({ status: "failure" });
    }

    // jwt check
    jwt.verify(
      cookies.accessToken,
      process.env.JWT_SECRET as Secret,
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        // invalid token so delete the cookie
        if (err) {
          cleanCookie(res, "accessToken");
          return res.send({ status: "failure" });
        }

        // token is valid so proceed
        req.decoded = decoded;
        next();
      }
    );
  } catch (error) {
    handleDefaultErr(error);
    return serverError(res);
  }
};

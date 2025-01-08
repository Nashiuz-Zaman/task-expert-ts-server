// core
import jwt, { Secret, JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// utils
import { handleDefaultErr, serverError } from "../utils";

// load env
dotenv.config();

export interface CustomRequest extends Request {
  decoded?: string | JwtPayload | undefined;
}

export const verifyOTPCookie = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
  
    // no cookie
    if (!cookies["otp-cookie"]) {
      return res.status(401).send({
        status: "error",
        message: "Your account has been deleted, pleaser register again",
      });
    }

    // invalid token
    jwt.verify(
      cookies["otp-cookie"].accessToken,
      process.env.JWT_SECRET as Secret,
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
          return res
            .status(401)
            .send({ status: "error", message: "OTP has expired" });
        }

        req.decoded = decoded;
        next();
      }
    );
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

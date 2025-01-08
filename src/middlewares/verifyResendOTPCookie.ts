// core
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// utils
import { handleDefaultErr, serverError } from "../utils";

// load env
dotenv.config();

export const verifyResendOTPCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;

    // no cookie
    if (!cookies["otp-cookie"]) {
      return res
        .status(401)
        .send({ status: "error", message: "unauthorized access 3" });
    }

    next();
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

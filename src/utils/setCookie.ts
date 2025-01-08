import { Response } from "express";
import { clientDomain } from "../app/app";

export const setCookie = (
  res: Response,
  cookieName: string,
  cookieContent: any,
  maxAge?: number
): void => {
  res.cookie(cookieName, cookieContent, {
    maxAge: maxAge || 60000 * 10,
    sameSite: "none",
    httpOnly: true,
    secure: true,
    domain: clientDomain,
    path: "/",
  });
};

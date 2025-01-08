import { Response } from "express";
import { clientDomain } from "../app/app";

export const cleanCookie = (res: Response, cookieName: string): void => {
  const httpOnly = true;
  const secure = true;
  const sameSite = "none";
  const domain = clientDomain;
  const path = "/";

  res.clearCookie(cookieName, {
    httpOnly: httpOnly,
    secure: secure,
    sameSite: sameSite,
    domain: domain,
    path: path,
  });

  res.cookie(cookieName, "", {
    expires: new Date(0),
    httpOnly: httpOnly,
    secure: secure,
    sameSite: sameSite,
    domain: domain,
    path: path,
  });
};

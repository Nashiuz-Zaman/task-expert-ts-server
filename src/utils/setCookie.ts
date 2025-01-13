import { Response } from 'express';
import { clientDomain } from '../app/app';

export const setCookie = (
   res: Response,
   cookieName: string,
   cookieContent: any,
   maxAge?: number
): void => {
   res.cookie(cookieName, cookieContent, {
      maxAge: maxAge || 60000 * 10, // 60000ms equal to 60 secs = 1 min
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      domain: clientDomain,
      path: '/',
   });
};

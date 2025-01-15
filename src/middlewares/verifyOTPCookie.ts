// core
import jwt, { Secret, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';

// utils
import { handleDefaultErr, sendError, serverError } from '../utils';

// load env
dotenv.config();

// types
import { ICustomRequest } from '../types/customRequest';

export const verifyOTPCookie = (
   req: ICustomRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      const cookies = req.cookies;
      const otpCookieName = process.env.OTP_COOKIE_NAME as string;

      // no cookie
      if (!cookies[otpCookieName]) {
         return sendError({
            res,
            message: 'Your account has been deleted, please signup again',
            statusCode: 401,
         });
      }

      // invalid token
      jwt.verify(
         cookies[otpCookieName].accessToken,
         process.env.JWT_SECRET as Secret,
         (
            err: VerifyErrors | null,
            decoded: string | JwtPayload | undefined
         ) => {
            if (err) {
               return sendError({
                  res,
                  message: 'OTP has expired',
                  statusCode: 401,
               });
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

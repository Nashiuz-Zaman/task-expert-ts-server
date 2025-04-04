// core
import jwt, { Secret, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';

// utils
import { cleanCookie, handleDefaultErr, serverError } from '../utils';
import { ICustomRequest } from '../types/customRequest';

// load env
dotenv.config();

export const verifyAccessToken = async (
   req: ICustomRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      const cookies = req.cookies;

      // no cookie
      if (!cookies[process.env.ACCESS_TOKEN_NAME as string]) {
         return res.send({ status: 'failure' });
      }

      // jwt check
      jwt.verify(
         cookies[process.env.ACCESS_TOKEN_NAME as string],
         process.env.JWT_SECRET as Secret,
         (
            err: VerifyErrors | null,
            decoded: string | JwtPayload | undefined
         ) => {
            // invalid token so delete the cookie
            if (err) {
               cleanCookie(res, process.env.ACCESS_TOKEN_NAME as string);
               return res.send({ status: 'failure' });
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

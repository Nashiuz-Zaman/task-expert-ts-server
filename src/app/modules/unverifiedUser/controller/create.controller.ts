// core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// utils
import {
   generateOTP,
   generateToken,
   setCookie,
   handleDefaultErr,
   sendOTP,
   sendError,
   serverError,
} from '../../../../utils';

// types
import { IUnverifiedUser } from '../type';

// service
import { createUnverifiedUserService } from '../service/create.service';
import { getUserService } from '../../user/service/get.service';

export const createUnverifiedUserController = async (
   req: Request,
   res: Response
): Promise<Response> => {
   try {
      const body = req.body;

      // if user already exists, registration won't proceed
      const user = await getUserService(body?.email, false);

      if (user?._id) {
         // if (!user?.socialMediaAccountType) {
         //    return sendError({
         //       res,
         //       message: 'Account exists. Please login.',
         //    });
         // }
         // if (user?.socialMediaAccountType) {
         //    return sendError({
         //       res,
         //       message: `${user?.socialMediaAccountType} account exists. Please use Google to login.`,
         //    });
         // }
      }

      // registration proceeds from here
      // 1. hash password
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);

      // 2. generate otp
      const otp = generateOTP();

      // 3. create unverified user
      const unverifiedUser: IUnverifiedUser = {
         name: body.name,
         email: body.email,
         password: body.password,
         otp,
      };

      // 4. create unverified user in db
      const newUnverifiedUser = await createUnverifiedUserService(
         unverifiedUser,
         false
      );

      // 5. send otp and set cookie
      if (newUnverifiedUser?._id) {
         // generate jwt access token for otp stage
         const accessToken = generateToken(
            {
               email: newUnverifiedUser.email,
            },
            // expires in
            '10m'
         );

         // set cookie and cookie will also expire after 10 mins
         setCookie(
            res,
            process.env.OTP_COOKIE_NAME as string,
            { accessToken, email: newUnverifiedUser?.email },
            60000 * 10
         );

         const otpSent = await sendOTP(otp, newUnverifiedUser?.email);

         if (otpSent) {
            return res.send({
               status: 'success',
               message: 'OTP sent successfully',
            });
         }
      }

      return serverError(res);
   } catch (error) {
      handleDefaultErr(error);
      return serverError(res);
   }
};

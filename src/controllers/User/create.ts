// core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// model
import UserModel from '../../models/User/User';
import UnverifiedUserModel from './../../models/UnverifiedUser/UnverifiedUser';

// utils
import {
   generateOTP,
   generateToken,
   setCookie,
   handleDefaultErr,
   sendOTP,
   sendError,
   serverError,
} from '../../utils';

// types
import {
   IUnverifiedUser,
   IUnverifiedUserDocument,
} from '../../types/unverifiedUser';

const create = async (req: Request, res: Response): Promise<Response> => {
   try {
      const body = req.body;

      // if user already exists, registration won't proceed

      const filter = { email: body.email };
      const user = await UserModel.findOne(filter).exec();

      if (user?._id) {
         if (!user?.isGoogleAccount) {
            return sendError({
               res,
               message: 'Account exists. Please login.',
            });
         }

         if (user?.isGoogleAccount) {
            return sendError({
               res,
               message: 'Google account exists. Please use Google to login.',
            });
         }
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
         image: null,
         password: body.password,
         otp,
         isGoogleAccount: false,
      };

      // 4. create unverified user in db
      const newUnverifiedUser = (await UnverifiedUserModel.create(
         unverifiedUser
      )) as IUnverifiedUserDocument;

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
            { accessToken, email: newUnverifiedUser.email },
            60000 * 10
         );

         const otpSent = await sendOTP(otp, newUnverifiedUser.email);

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

export default create;

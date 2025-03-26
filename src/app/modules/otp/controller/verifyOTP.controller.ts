// core
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// models and types
import { ICustomRequest } from '../../../../shared/type/customRequest';
import { IUser } from '../../user/type';

// utils
import {
   cleanCookie,
   generateToken,
   handleDefaultErr,
   sendError,
   serverError,
   setCookie,
} from '../../../../utils';

// service
import { createUserService } from '../../user/service';
import { deleteUnverifiedUserService } from '../../unverifiedUser/service';
import { getUnverifiedUserService } from '../../unverifiedUser/service/get.service';

export const verifyOTPController = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      const { email } = req.decoded as JwtPayload;
      const { otpCode } = req.body;
      console.log(otpCode);

      // 1. find unverified user from db
      const unverifiedUser = await getUnverifiedUserService(email);

      // 2. check if otp matches with db
      if (otpCode?.toUpperCase() !== unverifiedUser?.otp) {
         return sendError({
            res,
            message: 'Wrong OTP provided',
            status: 'failure',
            statusCode: 403,
         });
      }

      // 3. Create new user if otp is successful
      const user: IUser = {
         name: unverifiedUser.name,
         email: email as string,
         password: unverifiedUser.password,
         image: unverifiedUser.image,
      };
      const createUser = createUserService(user, false);

      // 4. delete unverified account of this user
      const deleteUnverified = deleteUnverifiedUserService(user?.email);

      // execute both promises
      const [deletionResult, creationResult] = await Promise.all([
         deleteUnverified,
         createUser,
      ]);

      if (deletionResult?.deletedCount) {
         console.log(
            `${unverifiedUser.name} has been verified, so their unverified account deleted`
         );
      }

      if (creationResult?._id) {
         cleanCookie(res, process.env.OTP_COOKIE_NAME as string);

         const user = creationResult.toObject();
         delete user.password;

         // create jwt access token
         const accessToken = generateToken(
            {
               email,
               isGoogleAccount: false,
            },
            // jwt expires in 2 days
            '2d'
         );

         // cookie expires in 2 days
         setCookie(
            res,
            process.env.ACCESS_TOKEN_NAME as string,
            accessToken,
            60000 * 2880
         );

         return res.send({
            status: 'success',
            user,
            message: 'user verified successfully',
         });
      }

      return serverError(res);
   } catch (err) {
      handleDefaultErr(err);
      return serverError(res);
   }
};

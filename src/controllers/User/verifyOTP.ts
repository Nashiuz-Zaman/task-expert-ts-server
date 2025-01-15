// core
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// models and types
import { IUnverifiedUserDocument } from '../../types/unverifiedUser';
import UnverifiedUserModel from '../../models/UnverifiedUser/UnverifiedUser';
import { ICustomRequest } from '../../types/customRequest';
import { IUser, IUserDocument } from '../../types/user';
import UserModel from '../../models/User/User';

// utils
import {
   cleanCookie,
   generateToken,
   handleDefaultErr,
   sendError,
   serverError,
   setCookie,
} from '../../utils';

const verifyOTP = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      const { email } = req.decoded as JwtPayload;
      const { otpCode } = req.body;
      console.log(otpCode);

      // 1. find unverified user from db
      const unverifiedUser = (await UnverifiedUserModel.findOne({
         email: email,
      }).exec()) as IUnverifiedUserDocument;

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
         isGoogleAccount: false,
         image: unverifiedUser.image,
      };
      const createUser = UserModel.create(user);

      // 4. delete unverified account of this user
      const deleteUnverified = UnverifiedUserModel.deleteOne({ email });

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

export default verifyOTP;

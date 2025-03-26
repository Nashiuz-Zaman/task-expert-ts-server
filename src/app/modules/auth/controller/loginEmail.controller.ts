// core
import { Request, Response } from 'express';

// models
import UserModel from '../../user/model';

// utils
import {
   compareHashed,
   generateToken,
   handleDefaultErr,
   sendError,
   serverError,
   setCookie,
} from '../../../../utils';
import { IUserDocument } from '../../user/type';

export const loginEmail = async (
   req: Request,
   res: Response
): Promise<Response> => {
   try {
      const { email, password } = req.body;
      console.log(email, password);

      const user = (await UserModel.findOne({
         email,
      })
         .select('+password')
         .exec()) as IUserDocument;

      if (!user) {
         return sendError({ res, message: 'Invalid email or password' });
      }

      if (user?._id) {
         // check if students account is a google account
         // if (user?.) {
         //    return sendError({
         //       res,
         //       message: 'Google account exists. Please use Google to login',
         //    });
         // }

         const isPasswordValid: boolean = await compareHashed(
            password,
            user?.password as string
         );

         if (!isPasswordValid) {
            return sendError({ res, message: 'Invalid email or password' });
         }

         // if password valid, then generate jwt token and cookie for 2 days
         const accessToken = generateToken(
            {
               email: user.email,
            },
            '2d'
         );

         // set cookie for 2 days
         setCookie(
            res,
            process.env.ACCESS_TOKEN_NAME as string,
            accessToken,
            60000 * 2880
         );

         return res.send({
            status: 'success',
            user,
            message: 'Login successful',
         });
      }

      return serverError(res);
   } catch (err) {
      handleDefaultErr(err);
      return serverError(res);
   }
};

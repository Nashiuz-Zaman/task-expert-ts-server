import { Request, Response } from 'express';

import {
   generateToken,
   handleDefaultErr,
   serverError,
   setCookie,
} from '../../utils';

import { IUser, IUserDocument } from '../../types/user';
import UserModel from '../../models/User/User';

export const loginGoogle = async (
   req: Request,
   res: Response
): Promise<Response> => {
   try {
      const { email, name } = req.body;
      const filter = { email };
      let userToSend;

      // if user already exists send only data
      const user = (await UserModel.findOne(filter).exec()) as IUserDocument;

      // create jwt access token
      const accessToken = generateToken(
         {
            email,
            isGoogleAccount: true,
         },
         // jwt expires in 2 days
         '2d'
      );

      // cookie expires in 2 days
      setCookie(res, 'access_token', accessToken, 60000 * 2880);

      if (user?._id) {
         userToSend = user;
      } else {
         const newGoogleUser: IUser = {
            email,
            name,
            password: null,
            isGoogleAccount: true,
            image: null,
         };

         userToSend = (await UserModel.create(newGoogleUser)) as IUserDocument;
      }

      return res.send({ status: 'success', user: userToSend });
   } catch (err) {
      handleDefaultErr(err);
      return serverError(res);
   }
};

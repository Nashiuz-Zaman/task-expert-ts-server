// core
import { Response } from 'express';

// models
import UserModel from '../../models/User/User';

// utils
import { cleanCookie, handleDefaultErr, serverError } from '../../utils';
import { ICustomRequest } from '../../types/customRequest';
import { IPayload } from '../../types/payload';

const appInit = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      // find the email
      const decoded = req.decoded;
      const { email } = decoded as IPayload;
      console.log(email);
      const filter = { email };

      const user = await UserModel.findOne(filter).exec();

      if (!user) {
         cleanCookie(res, 'accessToken');
         return serverError(res);
      }

      if (user?._id) {
         return res.send({ status: 'success', user });
      }

      return serverError(res);
   } catch (error) {
      handleDefaultErr(error);
      return serverError(res);
   }
};

export default appInit;

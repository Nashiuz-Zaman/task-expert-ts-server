// core
import { Request, Response } from 'express';

// utils
import { handleDefaultErr, serverError, cleanCookie } from '../../utils';

export const logout = async (
   req: Request,
   res: Response
): Promise<Response> => {
   try {
      cleanCookie(res, process.env.ACCESS_TOKEN_NAME as string);

      return res.send({
         status: 'success',
      });
   } catch (err) {
      handleDefaultErr(err);
      return serverError(res);
   }
};

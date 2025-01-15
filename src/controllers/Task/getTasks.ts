import { Response } from 'express';
import { ICustomRequest } from '../../types/customRequest';
import { IPayload } from '../../types/payload';
import { sendError } from '../../utils';
import TaskModel from '../../models/Task/Task';

export const getTasks = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      // verify
      const { email } = req.params;
      const decoded = req.decoded as IPayload;

      if (decoded.email !== email) {
         return sendError({
            res,
            statusCode: 403,
            message: 'Forbidden Access',
         });
      }

      const filter = { email: email };

      const tasks = await TaskModel.find(filter).sort({ lastUpdated: 1 });
      return res.send({ status: 'success', tasks });
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

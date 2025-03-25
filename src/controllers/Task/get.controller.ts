// types
import { Response } from 'express';
import { ICustomRequest } from '../../types/customRequest';
import { IPayload } from '../../types/payload';

// services
import { FetchTasksService } from '../../services/task';

// utils
import { sendError } from '../../utils';

export const getTasks = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      // verify
      const { email, statusLevel } = req.params;
      const decoded = req.decoded as IPayload;

      if (decoded.email !== email) {
         return sendError({
            res,
            statusCode: 403,
            message: 'Forbidden Access',
         });
      }

      const tasks = await fetchTasksService(email, parseInt(statusLevel));
      return res.send({ status: 'success', tasks });
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

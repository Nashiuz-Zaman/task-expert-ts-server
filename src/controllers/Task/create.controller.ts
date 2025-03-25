import { IPayload } from '../../types/payload';
import { Response } from 'express';
import { ICustomRequest } from '../../types/customRequest';
import { createTaskService } from '../../services/task';
import { handleDefaultErr, sendError, serverError } from '../../utils';
import TaskModel from '../../models/Task/Task';

export const createTaskController = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      // verify
      const newTask = req.body;
      const email = newTask.email;
      if ((req?.decoded as IPayload)?.email !== email) {
         return sendError({
            res,
            statusCode: 403,
            message: 'Forbidden Access',
         });
      }

      // gather data
      const filter = { email };

      // create task
      const newCreatedTask = await createTaskService(newTask, false);
   

      if (newCreatedTask?._id) {
         const tasks = await TaskModel.find(filter).sort({ lastUpdated: 1 });
         return res.send({ status: 'success', tasks });
      }

      return serverError(res);
   } catch (error) {
      handleDefaultErr(error);
      return serverError(res);
   }
};

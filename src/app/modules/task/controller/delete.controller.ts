import { Response } from 'express';
import TaskModel from '../../models/Task/Task';
import { ICustomRequest } from '../../types/customRequest';
import { IPayload } from '../../types/payload';
import { sendError, serverError } from '../../utils';

const deleteTask = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      // verify
      const { email } = req.query;
      const decoded = req.decoded as IPayload;

      if (decoded.email !== email) {
         return res
            .status(403)
            .send({ status: 'error', message: 'Forbidden Access' });
      }
      // gather data
      const id = req.params.id;
      const filter = { _id: id };
      const result = await TaskModel.deleteOne(filter);

      if (!result.deletedCount) {
         return sendError({
            res,
            status: 'failure',
            statusCode: 404,
            message: 'Task not deleted',
         });
      }

      const newTasks = await TaskModel.find({ email: email }).sort({
         lastUpdated: 1,
      });

      return res.send({ status: 'success', updatedTasks: newTasks });
   } catch (error) {
      return serverError(res);
   }
};

export default deleteTask;

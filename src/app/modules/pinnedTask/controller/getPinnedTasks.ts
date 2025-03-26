// imports

import { Response } from 'express';
import PinnedTaskModel from '../../models/PinnedTask/PinnedTask';
import { ICustomRequest } from '../../types/customRequest.js';
import { IPayload } from '../../types/payload.js';
import { sendError } from '../../utils';

const getPinnedTasks = async (
   req: ICustomRequest,
   res: Response
): Promise<Response> => {
   try {
      const { email } = req.params;
      const decoded = req.decoded as IPayload;

      if (decoded.email !== email) {
         return sendError({
            res,
            statusCode: 403,
            message: 'Forbidden Access',
         });
      }

      const filter = { email };
      const pinnedTasks = await PinnedTaskModel.find(filter);

      return res.send({ status: 'success', pinnedTasks });
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

export default getPinnedTasks;

import { Response } from 'express';

type SendError = (params: {
   res: Response;
   statusCode?: number;
   message?: string;
   status?: string;
}) => Response;

export const sendError: SendError = ({
   res,
   statusCode = 400,
   message = 'An Error Occurred',
   status = 'failure',
}) => {
   return res.status(statusCode).send({
      status,
      message,
   });
};

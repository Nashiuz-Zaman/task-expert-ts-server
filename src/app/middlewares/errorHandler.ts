import { Request, Response } from 'express';
import { AppError } from '../app/classes/AppError';

export const errorHandler = (err: AppError, req: Request, res: Response) => {
   res.status(err.statusCode || 500).send({
      success: false,
      message: err.message || 'Internal Server Error',
   });
};

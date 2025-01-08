import { Request, Response } from "express";
import { AppError } from "../classes/AppError";

export const errorHandler = (err: AppError, req: Request, res: Response) => {
  res.status(err.statusCode || 500).send({ message: err.message });
};

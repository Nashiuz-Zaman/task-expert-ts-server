import { Response } from "express";

export const serverError = (res: Response): Response => {
  return res.status(500).send({ status: "error" });
};

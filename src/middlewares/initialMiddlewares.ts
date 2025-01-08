import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const initialMiddlewares = (app: Express): void => {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};

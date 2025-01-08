import { Express } from "express";

import userRouter from "./User";

// api version right now
const apiV1 = "/api/v1";

export const initRoutes = (app: Express): void => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  // server health test
  app.get("/health", (req, res) => {
    res.send("Working properly");
  });

  app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
  });

  app.use(apiV1, userRouter);
};

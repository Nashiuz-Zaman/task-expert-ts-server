import express, { Express, NextFunction, Request, Response } from "express";
import { AppError } from "../classes/AppError";
import { errorHandler, initialMiddlewares } from "../middlewares";
import { initRoutes } from "../routes";
import { config } from "dotenv";

config();

const app: Express = express();
export const clientUrl: string =
  process.env.NODE_ENV === "development"
    ? `${process.env.DEV_CLIENT_URL}`
    : `${process.env.PROD_CLIENT_URL}`;

export const clientDomain: string =
  process.env.NODE_ENV === "development"
    ? `${process.env.DEV_CLIENT_DOMAIN}`
    : `${process.env.PROD_CLIENT_DOMAIN}`;

// Initialize middlewares
initialMiddlewares(app);

// Initialize routes
initRoutes(app);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Server health test route
app.get("/health", (req: Request, res: Response) => {
  res.send("Working properly");
});

// Error handling for invalid URLs
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`${req.url} is an invalid url`, 404);
  next(error);
});

// Global error handling middleware
app.use(errorHandler);

export default app;

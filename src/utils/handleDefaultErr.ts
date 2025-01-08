import { AppError } from "../classes/AppError";

export const handleDefaultErr = (err: unknown): void => {
  if (err instanceof Error) {
    console.log(new AppError(err.message));
  } else {
    console.log(new AppError("Unknown type of error, not built-in JS Error"));
  }
};

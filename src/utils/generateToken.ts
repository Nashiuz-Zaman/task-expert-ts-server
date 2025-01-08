// import jwt
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

// load env
dotenv.config();

export interface IPayload {
  email: string;
  isGoogleAccount?: boolean;
  role?: "student" | "mentor" | "admin";
}

export const generateToken = (
  payload: IPayload,
  expiresIn: string = "3d"
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: expiresIn,
  });
};

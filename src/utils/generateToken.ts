// import jwt
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

// load env
dotenv.config();

// types
import { IPayload } from '../types/payload';

export const generateToken = (
   payload: IPayload,
   expiresIn: string = '3d'
): string => {
   return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
      expiresIn: expiresIn,
   });
};

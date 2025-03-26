import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ICustomRequest extends Request {
   decoded?: string | JwtPayload | undefined;
}

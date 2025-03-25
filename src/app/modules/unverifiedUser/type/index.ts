import { Document } from 'mongoose';
import { IUser } from '../../user/type';

export interface IUnverifiedUser extends IUser {
   otp: string;
}

export type IUnverifiedUserDocument = IUnverifiedUser & Document;

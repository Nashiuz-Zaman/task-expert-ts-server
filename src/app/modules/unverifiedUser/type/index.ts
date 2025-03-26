import { Document } from 'mongoose';
import { IBaseUser } from '../../base/type/baseUser';

export interface IUnverifiedUser extends IBaseUser {
   otp: string;
}

export type IUnverifiedUserDocument = IUnverifiedUser & Document;

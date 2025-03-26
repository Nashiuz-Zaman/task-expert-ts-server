import { Document } from 'mongoose';
import { IBaseUser } from '../../base/type/baseUser';

export interface IUser extends IBaseUser {
   image?: string;
}

export type IUserDocument = IUser & Document;

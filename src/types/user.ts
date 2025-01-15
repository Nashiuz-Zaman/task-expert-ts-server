import { Document } from 'mongoose';

export interface IUser {
   name: string;
   email: string;
   password?: string | null;
   image: string | null;
   isGoogleAccount: boolean;
}

export type IUserDocument = IUser & Document;

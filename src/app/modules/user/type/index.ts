import { Document } from 'mongoose';

export interface IUser {
   name: string;
   email: string;
   password?: string;
   image?: string;
   socialMediaAccountType?: 'google' | 'facebook';
}

export type IUserDocument = IUser & Document;

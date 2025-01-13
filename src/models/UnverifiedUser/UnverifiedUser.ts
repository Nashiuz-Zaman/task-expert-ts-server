import { Schema, model } from 'mongoose';
import { IUser } from '../User/User';

export interface IUnverifiedUser extends IUser, Document {
   otp: string;
   otpExpires: Date;
}

const unverifiedUserSchema: Schema = new Schema<IUnverifiedUser>({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   image: {
      type: String,
   },
   role: {
      type: String,
      required: true,
   },
   isGoogleAccount: {
      type: Boolean,
      required: true,
   },
   otp: { type: String, require: true },
   otpExpires: { type: Date, required: true },
});

const UnverifiedUserModel = model<IUnverifiedUser>(
   'UnverifiedUser',
   unverifiedUserSchema
);

export default UnverifiedUserModel;

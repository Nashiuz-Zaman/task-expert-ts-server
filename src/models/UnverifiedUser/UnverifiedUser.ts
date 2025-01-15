import { Schema, model } from 'mongoose';
import { IUnverifiedUserDocument } from '../../types/unverifiedUser';

const unverifiedUserSchema: Schema = new Schema<IUnverifiedUserDocument>({
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
   isGoogleAccount: {
      type: Boolean,
      required: true,
   },
   otp: { type: String, require: true },
});

const UnverifiedUserModel = model<IUnverifiedUserDocument>(
   'UnverifiedUser',
   unverifiedUserSchema
);

export default UnverifiedUserModel;

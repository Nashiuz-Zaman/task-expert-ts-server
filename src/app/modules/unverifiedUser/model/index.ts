import { Schema, model } from 'mongoose';
import { IUnverifiedUserDocument } from '../type';

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
   socialMediaAccountType: {
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

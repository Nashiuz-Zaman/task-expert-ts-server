import { Schema, model } from 'mongoose';
import { IUserDocument } from '../type';

const userSchema = new Schema<IUserDocument>(
   {
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
         select: false,
         default: undefined
      },
      image: {
         type: String,
         default: undefined
      },
      socialMediaAccountType: {
         type: String,
         enum: ['google', 'facebook'],
         default: undefined
      },
   },
   {
      toJSON: { versionKey: false },
      toObject: { versionKey: false },
   }
);

const UserModel = model<IUserDocument>('User', userSchema);
export default UserModel;

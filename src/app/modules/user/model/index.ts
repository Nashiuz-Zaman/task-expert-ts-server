import { Schema, model } from 'mongoose';
import { IUserDocument } from '../type';
import baseUser from '../../base/model/baseUser';

const userSchema = new Schema<IUserDocument>(
   {
      ...baseUser,

      image: { type: String, default: undefined },
   },
   {
      toJSON: { versionKey: false },
      toObject: { versionKey: false },
   }
);

const UserModel = model<IUserDocument>('User', userSchema);
export default UserModel;

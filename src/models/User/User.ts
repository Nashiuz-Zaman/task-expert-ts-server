import { Schema, model } from 'mongoose';
import { IUserDocument } from '../../types/user';

const userSchema = new Schema<IUserDocument>({
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
      default: null,
   },
   image: {
      type: String,
      default: null,
   },
   isGoogleAccount: {
      type: Boolean,
      required: true,
   },
});

const UserModel = model<IUserDocument>('User', userSchema);
export default UserModel;

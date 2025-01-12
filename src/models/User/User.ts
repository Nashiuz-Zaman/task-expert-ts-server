import { Schema, model } from 'mongoose';

interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   image?: string;
   role: string;
}

const userSchema = new Schema<IUser>({
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
});

const UserModel = model<IUser>('User', userSchema);
export default UserModel;

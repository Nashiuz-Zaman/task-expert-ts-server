import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser extends Document {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password?: string;
  photo?: string;
  isGoogleAccount: boolean;
  role?: string;
  additionalData: Types.ObjectId;
}

export type UserModel = Model<IUser>;

const userSchema: Schema = new Schema<IUser, UserModel>({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  isGoogleAccount: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "student",
  },
  additionalData: {
    type: Schema.Types.ObjectId,
    ref: "StudentProfile",
    default: null
  },
});

export const User: UserModel = model<IUser, UserModel>("User", userSchema);

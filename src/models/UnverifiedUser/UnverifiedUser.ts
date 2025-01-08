import { Schema, model, Model } from "mongoose";
import { IUser } from "../User/User";

export interface IUnverifiedUser extends IUser {
  otp: string;
  otpExpires: Date;
}

export type UnverifiedUserModel = Model<IUnverifiedUser>;

const unverifiedUserSchema: Schema = new Schema<
  IUnverifiedUser,
  UnverifiedUserModel
>({
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
    default: ""
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: { type: String, require: true },
  isGoogleAccount: { type: Boolean, require: true },
});

export const UnverifiedUser: UnverifiedUserModel = model<
  IUnverifiedUser,
  UnverifiedUserModel
>("UnverifiedUser", unverifiedUserSchema);

import { Schema, model } from 'mongoose';
import { IUnverifiedUserDocument } from '../type';
import baseUser from '../../base/model/baseUser';

const unverifiedUserSchema = new Schema<IUnverifiedUserDocument>({
   ...baseUser,
   otp: { type: String, required: true },
});

const UnverifiedUserModel = model<IUnverifiedUserDocument>(
   'UnverifiedUser',
   unverifiedUserSchema
);

console.log(unverifiedUserSchema.obj);

export default UnverifiedUserModel;

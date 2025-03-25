import UnverifiedUserModel from '../../models/UnverifiedUser/UnverifiedUser';
import { DeleteResult } from 'mongodb';

export const deleteUnverifiedUserService = async (
   email: string
): Promise<DeleteResult> => {
   if (!email) {
      throw new Error('Email is required to delete an unverified user.');
   }

   return await UnverifiedUserModel.deleteOne({ email });
};

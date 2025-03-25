import UnverifiedUserModel from '../model';
import { IUnverifiedUserDocument, IUnverifiedUser } from '../type';

type GetUnverifiedUserService<T> = T extends true
   ? IUnverifiedUser
   : IUnverifiedUserDocument;

export const getUnverifiedUserService = async <T extends boolean = true>(
   email: string,
   lean: T = true as T
): Promise<GetUnverifiedUserService<T>> => {
   if (lean) {
      return (await UnverifiedUserModel.findOne({
         email,
      })
         .lean()
         .exec()) as GetUnverifiedUserService<T>;
   }

   return (await UnverifiedUserModel.findOne({
      email,
   }).exec()) as GetUnverifiedUserService<T>;
};

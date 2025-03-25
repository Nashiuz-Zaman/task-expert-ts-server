import { IUnverifiedUserDocument, IUnverifiedUser } from '../type';
import UnverifiedUserModel from '../model';

type createUnverifiedUserService<T> = T extends true
   ? IUnverifiedUser
   : IUnverifiedUserDocument;

export const createUnverifiedUserService = async <T extends boolean = true>(
   user: IUnverifiedUser,
   lean: T = true as T
): Promise<createUnverifiedUserService<T>> => {
   if (lean) {
      return (
         await UnverifiedUserModel.create(user)
      ).toObject() as createUnverifiedUserService<T>;
   } else {
      return (await UnverifiedUserModel.create(
         user
      )) as createUnverifiedUserService<T>;
   }
};

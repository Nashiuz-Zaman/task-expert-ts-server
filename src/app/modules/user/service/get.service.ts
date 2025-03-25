import UserModel from '../model';
import { IUser, IUserDocument } from '../type';

type GetUserService<T> = T extends true ? IUser : IUserDocument;

export const getUserService = async <T extends boolean = true>(
   email: string,
   lean: T = true as T
): Promise<GetUserService<T>> => {
   if (lean) {
      return (await UserModel.findOne({
         email,
      })
         .lean()
         .exec()) as GetUserService<T>;
   }

   return (await UserModel.findOne({
      email,
   }).exec()) as GetUserService<T>;
};

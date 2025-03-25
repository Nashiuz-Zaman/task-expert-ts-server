import { IUser, IUserDocument } from '../type';
import UserModel from '../model';

type createUserService<T> = T extends true ? IUser : IUserDocument;

export const createUserService = async <T extends boolean = true>(
   user: IUser,
   lean: T = true as T
): Promise<createUserService<T>> => {
   if (lean) {
      return (await UserModel.create(user)).toObject() as createUserService<T>;
   } else {
      return (await UserModel.create(user)) as createUserService<T>;
   }
};

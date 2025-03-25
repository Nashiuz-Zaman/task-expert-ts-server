import TaskModel from '../model';
import { ITask, ITaskDocument } from '../type';

type FetchTasksService<T> = T extends true ? ITask[] : ITaskDocument[];

export const fetchTasksService = async <T extends boolean = true>(
   email: string,
   statusLevel: number,
   lean: T = true as T
): Promise<FetchTasksService<T>> => {
   if (lean) {
      return (await TaskModel.find({
         email,
         statusLevel,
      })
         .sort({ lastUpdated: 1 })
         .lean()) as FetchTasksService<T>;
   } else {
      return (await TaskModel.find({
         email,
         statusLevel,
      }).sort({ lastUpdated: 1 })) as FetchTasksService<T>;
   }
};

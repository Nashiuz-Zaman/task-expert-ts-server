import TaskModel from '../model';
import { ITask, ITaskDocument } from '../type';

// type
type createTaskService<T> = T extends true ? ITask : ITaskDocument;

export const createTaskService = async <T extends boolean = true>(
   task: ITask,
   lean: T = true as T
): Promise<createTaskService<T>> => {
   if (lean) {
      return (await TaskModel.create(task)).toObject() as createTaskService<T>;
   } else {
      return (await TaskModel.create(task)) as createTaskService<T>;
   }
};

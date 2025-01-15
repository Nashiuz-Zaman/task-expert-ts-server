import { Schema, model } from 'mongoose';
import { ITaskDocument } from '../../types/task';

const taskSchema = new Schema<ITaskDocument>({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   deadline: {
      type: Date,
      required: true,
   },
   priorityLevel: {
      type: Number,
      required: true,
   },
   statusLevel: {
      type: Number,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   lastUpdated: {
      type: Date,
      required: true,
   },
});

const TaskModel = model<ITaskDocument>('Task', taskSchema);
export default TaskModel;

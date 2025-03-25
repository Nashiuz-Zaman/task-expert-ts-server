import { Schema, model } from 'mongoose';
import { ITaskDocument } from '../type';

const taskSchema = new Schema<ITaskDocument>(
   {
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
   },
   {
      toJSON: { virtuals: true, versionKey: false },
      toObject: { virtuals: true, versionKey: false },
   }
);

const TaskModel = model<ITaskDocument>('Task', taskSchema);
export default TaskModel;

import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
  priorityLevel: number;
  statusLevel: number;
  email: string;
  lastUpdated: Date;
}

const taskSchema = new Schema<ITask>({
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

const TaskModel = model<ITask>('Task', taskSchema);
export default TaskModel;

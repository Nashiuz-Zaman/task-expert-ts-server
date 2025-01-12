import { Schema, model, Document } from 'mongoose';

interface IPinnedTask extends Document {
  title: string;
  taskId: string;
  email: string;
  lastUpdated: Date;
}

const pinnedTaskSchema = new Schema<IPinnedTask>({
  title: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
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

const PinnedTaskModel = model<IPinnedTask>('PinnedTask', pinnedTaskSchema);
export default PinnedTaskModel;

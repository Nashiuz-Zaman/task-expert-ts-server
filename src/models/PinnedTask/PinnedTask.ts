import { Schema, model } from 'mongoose';
import { IPinnedTaskDocument } from '../../types/pinnedTask';

const pinnedTaskSchema = new Schema<IPinnedTaskDocument>({
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

const PinnedTaskModel = model<IPinnedTaskDocument>(
   'PinnedTask',
   pinnedTaskSchema
);
export default PinnedTaskModel;

import { Document } from 'mongoose';

export interface IPinnedTask {
   title: string;
   taskId: string;
   email: string;
   lastUpdated: Date;
}

export type IPinnedTaskDocument = IPinnedTask & Document;

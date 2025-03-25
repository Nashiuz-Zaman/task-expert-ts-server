import { Document } from 'mongoose';

export interface ITask {
   title: string;
   description: string;
   deadline: Date;
   priorityLevel: number;
   statusLevel: number;
   email: string;
   lastUpdated: Date;
}

export type ITaskDocument = ITask & Document;

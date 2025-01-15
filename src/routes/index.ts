import { Express } from 'express';

import userRouter from './User';
import authRouter from './Auth';
import pinnedTaskRouter from './pinnedTask';
import taskRouter from './task';

// api version right now
const apiV1 = '/api/v1';

export const initRoutes = (app: Express): void => {
   app.get('/', (req, res) => {
      res.send('Hello world');
   });

   // server health test
   app.get('/health', (req, res) => {
      res.send('Working properly');
   });

   app.get('/favicon.ico', (req, res) => {
      res.status(204).end();
   });

   app.use(apiV1, userRouter);
   app.use(apiV1, authRouter);
   app.use(apiV1, pinnedTaskRouter);
   app.use(apiV1, taskRouter);
};

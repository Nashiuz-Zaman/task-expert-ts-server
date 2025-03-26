// imports
import express from 'express';

// controller
import { getTasks, createTaskController } from '../controller';
// import updateTask from './../../api/task/controllers/updateTask.js';
// import deleteTask from './../../api/task/controllers/deleteTask.js';

// import editTask from './../../api/task/controllers/editTask.js';

// middlewares
import { verifyAccessToken } from '../../../middlewares';

// create router
const taskRouter = express.Router();

// routes
taskRouter.get('/tasks/:email/:statusLevel', verifyAccessToken, getTasks);
taskRouter.post('/tasks', verifyAccessToken, createTaskController);
// taskRouter.patch('/tasks/update-status/:id', verifyToken, updateTask);
// taskRouter.put('/tasks/edit/:id', verifyToken, editTask);
// taskRouter.delete('/tasks/delete/:id', verifyToken, deleteTask);

export default taskRouter;

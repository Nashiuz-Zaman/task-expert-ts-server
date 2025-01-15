// imports
import express from 'express';

// controller
import { getTasks } from '../../controllers/Task';
// import updateTask from './../../api/task/controllers/updateTask.js';
// import deleteTask from './../../api/task/controllers/deleteTask.js';
// import createTask from './../../api/task/controllers/createTask.js';
// import editTask from './../../api/task/controllers/editTask.js';

// middlewares
import { verifyAccessToken } from '../../middlewares';

// create router
const taskRouter = express.Router();

// routes
taskRouter.get('/tasks/:email', verifyAccessToken, getTasks);
// taskRouter.post('/tasks', verifyToken, createTask);
// taskRouter.patch('/tasks/update-status/:id', verifyToken, updateTask);
// taskRouter.put('/tasks/edit/:id', verifyToken, editTask);
// taskRouter.delete('/tasks/delete/:id', verifyToken, deleteTask);

export default taskRouter;

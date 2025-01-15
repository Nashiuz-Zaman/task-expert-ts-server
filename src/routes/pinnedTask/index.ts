// imports
import express from 'express';

// controller
// import addPinnedTask from '../../api/pinnedTask/controllers/addPinnedTask.js';
import getPinnedTasks from '../../controllers/PinnedTask/getPinnedTasks';

// import removePinnedTask from '../../api/pinnedTask/controllers/removePinnedTask.js';

// middlewares
import { verifyAccessToken } from '../../middlewares';

// create router
const pinnedTaskRouter = express.Router();

// routes
pinnedTaskRouter.get('/pinned-tasks/:email', verifyAccessToken, getPinnedTasks);
// pinnedTaskRouter.post('/pinned-tasks', verifyToken, addPinnedTask);
// pinnedTaskRouter.delete('/pinned-tasks/:id', verifyToken, removePinnedTask);

export default pinnedTaskRouter;

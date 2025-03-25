// imports
import { Router } from 'express';
import muilter from 'multer';

// controllers
import { createUserController } from '../controller';

// create instances
const upload = muilter();
const userRouter = Router();

// routes
userRouter.post('/', upload.none(), createUserController);

export default userRouter;

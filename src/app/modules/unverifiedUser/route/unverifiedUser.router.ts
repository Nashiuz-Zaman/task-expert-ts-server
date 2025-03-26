// imports
import { Router } from 'express';
import muilter from 'multer';

// controllers
import { createUnverifiedUserController } from '../controller/create.controller';

// create instances
const upload = muilter();
const unverifiedUserRouter = Router();

// routes
unverifiedUserRouter.post('/', upload.none(), createUnverifiedUserController);

export default unverifiedUserRouter;

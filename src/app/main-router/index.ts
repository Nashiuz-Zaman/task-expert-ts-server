import { Router } from 'express';
import unverifiedUserRouter from '../modules/unverifiedUser/route/unverifiedUser.router';

// create router
const router = Router();

// Group routes logically
router.use('/unverified-users', unverifiedUserRouter);

export default router;

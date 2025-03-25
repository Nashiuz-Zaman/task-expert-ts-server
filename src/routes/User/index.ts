// imports
import { Router } from 'express';
import muilter from 'multer';

const upload = muilter();

// controllers
import {
   createUserController,
   verifyOTPController,
} from '../../app/modules/user/controller';

// import resendOTP from "../../controllers/User/resendOTP";

// middlewares
import { verifyOTPCookie, verifyResendOTPCookie } from '../../middlewares';

// create router
const userRouter = Router();

// routes
userRouter.post('/users', upload.none(), createUserController);
userRouter.post(
   '/verify-otp',
   verifyOTPCookie,
   upload.none(),
   verifyOTPController
);
// userRouter.post("/resend-otp", verifyResendOTPCookie, resendOTP);

export default userRouter;

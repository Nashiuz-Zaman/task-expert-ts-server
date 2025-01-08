// imports
import { Router } from "express";
import muilter from "multer";

const upload = muilter();

// controllers
import create from "../../controllers/User/create";
import verifyOTP from "../../controllers/User/verifyOTP";
import resendOTP from "../../controllers/User/resendOTP";

// middlewares
import { verifyOTPCookie, verifyResendOTPCookie } from "../../middlewares";

// create router
const userRouter = Router();

// routes
userRouter.post("/users", upload.none(), create);
userRouter.post("/verify-otp", verifyOTPCookie, upload.none(), verifyOTP);
userRouter.post("/resend-otp", verifyResendOTPCookie, resendOTP);

export default userRouter;

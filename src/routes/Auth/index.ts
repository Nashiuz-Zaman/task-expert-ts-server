// imports
import { Router } from 'express';
import { verifyAccessToken } from './../../middlewares';
import multer from 'multer';

// controller
import appInit from '../../controllers/Auth/appInit';
import { loginGoogle } from "../../controllers/Auth/loginGoogle";
// import { loginEmail } from "../../controllers/Auth/loginEmail";
// import { logout } from "../../controllers/Auth/logout";
// import { forgetPassword } from "../../controllers/Auth/forgetPassword";
// import { changePassword } from "../../controllers/Auth/changePassword";

const authRouter = Router();
const upload = multer();

// routes
authRouter.get('/app-init', verifyAccessToken, appInit);
// authRouter.post("/email-auth", upload.none(), loginEmail);
authRouter.post("/google-auth", loginGoogle);
// authRouter.get("/logout", logout);
// authRouter.post("/forget-password", upload.none(), forgetPassword);
// authRouter.post("/change-password", upload.none(), changePassword);

export default authRouter;

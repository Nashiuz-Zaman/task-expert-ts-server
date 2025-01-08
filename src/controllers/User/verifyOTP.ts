// core
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

// models and interfaces
import { CustomRequest } from "../../middlewares/verifyOTPCookie";
import {
  IUnverifiedUser,
  UnverifiedUser,
} from "../../models/UnverifiedUser/UnverifiedUser";
import { User } from "../../models/User/User";

// utils
import { cleanCookie, handleDefaultErr, serverError } from "../../utils";

const verifyOTP = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.decoded as JwtPayload;
    const { otp } = req.body;

    // find unverified user from db
    const unverifiedUser = (await UnverifiedUser.findOne({
      email: email,
    }).exec()) as HydratedDocument<IUnverifiedUser>;

    // check if otp matches with db
    if (otp !== unverifiedUser.otp) {
      return res
        .status(403)
        .send({ status: "failure", message: "Wrong OTP provided" });
    }

    const user = {
      firstname: unverifiedUser.firstname,
      lastname: unverifiedUser.lastname,
      email: email as string,
      password: unverifiedUser.password,
      isGoogleAccount: false,
    };

    // delete unverified account of this user
    const deleteUnverified = UnverifiedUser.deleteOne({ email });
    const createUser = User.create(user);

    const [deletionResult, creationResult] = await Promise.all([
      deleteUnverified,
      createUser,
    ]);

    if (deletionResult?.deletedCount) {
      console.log(
        `${unverifiedUser.firstname} has been verified, so their unverified account deleted`
      );
    }

    if (creationResult?._id) {
      cleanCookie(res, "otp-cookie");

      return res.send({
        status: "success",
        message: "user verified successfully",
      });
    }

    return serverError(res);
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

export default verifyOTP;

// core
import { Response, Request } from "express";
import { HydratedDocument } from "mongoose";

// models and interfaces
import {
  IUnverifiedUser,
  UnverifiedUser,
} from "../../models/UnverifiedUser/UnverifiedUser";

// utils
import {
  generateOTP,
  handleDefaultErr,
  generateToken,
  setCookie,
  sendOTP,
} from "../../utils";

const resendOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    // find the email address
    const cookies = req.cookies;
    const { email } = cookies["otp-cookie"];

    // generate new otp
    const otp = generateOTP();

    // update db with new otp and send email to user if successful
    const unverifiedUser = (await UnverifiedUser.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    )) as HydratedDocument<IUnverifiedUser>;

    if (unverifiedUser._id) {
      const isSent = await sendOTP(otp, unverifiedUser.email);

      // if email sending successful, generate new jwt and reset cookie
      if (isSent) {
        // generate access token for otp stage
        const accessToken = generateToken(
          {
            email: unverifiedUser.email,
          },
          // expires in
          "10m"
        );

        // clear old cookie and set new cookie
        res.clearCookie("otp-cookie");

        // set cookie
        setCookie(
          res,
          "otp-cookie",
          { accessToken, email: unverifiedUser.email },
          60000 * 240
        );
        return res.send({ status: "success", message: "OTP resent" });
      }
    }

    return res
      .status(500)
      .send({ status: "failure", message: "OTP resent failed" });
  } catch (err) {
    handleDefaultErr(err);
    return res.status(500).send({ status: "error" });
  }
};

export default resendOTP;

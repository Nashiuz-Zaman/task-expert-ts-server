// core
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// model
import { User } from "./../../models/User/User";
import { UnverifiedUser } from "../../models/UnverifiedUser/UnverifiedUser";

// utils
import {
  generateOTP,
  generateToken,
  setCookie,
  handleDefaultErr,
  sendOTP,
} from "../../utils";

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.body;

    // if user already exists
    // registration won't proceed
    const filter = { email: user.email };
    const userRes = await User.findOne(filter).exec();

    if (userRes?._id) {
      if (userRes?.isGoogleAccount) {
        return res.status(400).send({
          status: "error",
          message: "Google user already exists, please continue with google",
        });
      }

      return res.status(400).send({
        status: "failure",
        message: "Student account already exists, please login",
      });
    }

    // registration proceeds from here
    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // generate otp
    const otp = generateOTP();

    // create unverified user
    const unverifiedUser = {
      ...user,
      otp,
      isGoogleAccount: false,
    };

    // create unverified user in db
    const newUnverifiedUser = await UnverifiedUser.create(unverifiedUser);

    // unverified user created
    // send otp and set cookie
    if (newUnverifiedUser?._id) {
      // generate access token for otp stage
      const accessToken = generateToken(
        {
          email: newUnverifiedUser.email,
        },
        // expires in
        "10m"
      );

      // set cookie
      setCookie(
        res,
        "otp-cookie",
        { accessToken, email: newUnverifiedUser.email },
        60000 * 240
      );

      await sendOTP(otp, newUnverifiedUser.email);

      // auto clear db after 4 hrs
      setTimeout(async () => {
        const filter = {
          email: newUnverifiedUser.email,
        };

        const unverifiedUser = await UnverifiedUser.findOne(filter);

        if (unverifiedUser?._id) {
          const res = await UnverifiedUser.deleteOne(filter);

          if (res?.deletedCount) {
            console.log(
              `${unverifiedUser.firstname}'s unverified account has been deleted`
            );
          }
        }
      }, 60000 * 240);
      return res.send({ status: "success", message: "OTP sent successfully" });
    }

    return res.status(400).send({ status: "failure" });
  } catch (error) {
    handleDefaultErr(error);
    return res.status(500).send({ status: "error" });
  }
};

export default create;

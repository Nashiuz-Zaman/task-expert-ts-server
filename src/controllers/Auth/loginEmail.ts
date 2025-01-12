// core
import { Request, Response } from "express";

// models
import { User } from "../../models/User/User";
import { Mentor } from "../../models/Mentor/Mentor";

// utils
import {
  compareHashed,
  generateToken,
  handleDefaultErr,
  serverError,
  setCookie,
} from "../../utils";

export const loginEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const checkUsers = User.findOne({ email: email })
      .populate("additionalData")
      .exec();
    const checkMentors = Mentor.findOne({ email: email })
      .populate("additionalData")
      .exec();

    const [user, mentor] = await Promise.all([checkUsers, checkMentors]);

    if (!user && !mentor) {
      return res
        .status(400)
        .send({ status: "failure", message: "Invalid email or password" });
    }

    // if student login
    if (user?._id) {
      // check if students account is a google account
      if (user?.isGoogleAccount) {
        return res
          .status(400)
          .send({ status: "failure", message: "Please use your Google login" });
      }

      const isPasswordValid: boolean = await compareHashed(
        password,
        user.password as string
      );

      if (!isPasswordValid) {
        return res.status(400).send({ message: "Invalid email or password" });
      }

      // if password valid, then generate jwt token for 3 days
      const accessToken = generateToken(
        {
          email: user.email,
          isGoogleAccount: false,
          role: "student",
        },
        "3d"
      );

      // set cookie for 3 days
      setCookie(res, "accessToken", accessToken, 60000 * 4320);

      // remove password from response
      user.password = "";

      return res.send({
        status: "success",
        user: user,
        message: "Login successful",
      });
    }

    // if mentor login
    if (mentor?._id) {
      if (!mentor?.approved) {
        return res
          .status(400)
          .send({ status: "failure", message: "Mentor is not approved yet" });
      }

      const isPasswordValid: boolean = await compareHashed(
        password,
        mentor.password as string
      );

      if (!isPasswordValid) {
        return res.status(400).send({ message: "Invalid email or password" });
      }

      // if password valid, then generate jwt token for 3 days
      const accessToken = generateToken(
        {
          email: mentor.email,
          isGoogleAccount: false,
          role: "mentor",
        },
        "3d"
      );

      // set cookie for 3 days
      setCookie(res, "accessToken", accessToken, 60000 * 4320);

      // remove password from response
      mentor.password = "";

      return res.send({
        status: "success",
        user: mentor,
        message: "Login successful",
      });
    }

    return serverError(res);
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

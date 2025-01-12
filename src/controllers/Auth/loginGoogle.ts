import { Request, Response } from "express";
import { IUser, User } from "../../models/User/User";
import {
  generateToken,
  handleDefaultErr,
  serverError,
  setCookie,
} from "../../utils";
import { Mentor } from "../../models/Mentor/Mentor";
import StudentProfile from "../../models/StudentProfile/StudentProfile";

export const loginGoogle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, username, photo } = req.body;
    const filter = { email };

    // if email registration account exists then send response accordingly
    const userPromise = User.findOne(filter).populate("additionalData").exec();
    const mentorPromise = Mentor.findOne(filter).exec();

    const [foundUser, foundMentor] = await Promise.all([
      userPromise,
      mentorPromise,
    ]);

    if (foundMentor?._id) {
      return res.status(400).send({
        status: "error",
        message: "Mentor account already exists, please login using email",
      });
    }

    if (foundUser?._id && !foundUser?.isGoogleAccount) {
      return res.status(400).send({
        status: "error",
        message: "Email registered account exists, please login using email",
      });
    }

    // generate access token
    const accessToken = generateToken(
      {
        email,
        isGoogleAccount: true,
        role: "student",
      },
      // expires in 3 days
      "3d"
    );

    // if google user exists, just send back the user data
    if (foundUser?._id && foundUser?.isGoogleAccount) {
      // set cookie
      setCookie(res, "accessToken", accessToken, 60000 * 4320);
      return res.send({ status: "success", user: foundUser });
    }

    // if no user found in any way create a new google user
    // 1. create studentprofile
    const newProfile = await StudentProfile.create({});

    if (newProfile?._id) {
      // 2. create student
      const googleUser = {
        username,
        email,
        photo,
        isGoogleAccount: true,
        additionalData: newProfile?._id,
      };

      const newGoogleUser = await User.create(googleUser);
      const populatedUser = await User.findById(newGoogleUser._id)
        .populate("additionalData")
        .exec();

      if (newGoogleUser?._id && populatedUser?._id) {
        // set cookie
        setCookie(res, "accessToken", accessToken, 60000 * 4320);
        return res.send({ status: "success", user: populatedUser });
      }
    }

    return serverError(res);
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

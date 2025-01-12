// core
import { Response } from "express";

// models
import { User } from "../../models/User/User";
import { Mentor } from "../../models/Mentor/Mentor";

// utils
import { cleanCookie, handleDefaultErr, serverError } from "../../utils";
import { CustomRequest } from "../../middlewares/verifyOTPCookie";
import { IPayload } from "../../utils/generateToken";

const appInit = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    // find the email
    const decoded = req.decoded;
    const { email, isGoogleAccount, role } = decoded as IPayload;
    const filter = { email };

    // student
    if (isGoogleAccount === true || role === "student") {
      const user = await User.findOne(filter)
        .populate("additionalData")
        .select("-password")
        .exec();

      if (!user) {
        cleanCookie(res, "accessToken");
        return serverError(res);
      }

      if (user?._id) {
        return res.send({ status: "success", user });
      }
    }

    // mentor
    const mentor = await Mentor.findOne(filter)
      .populate("additionalData")
      .select("-password")
      .exec();

    if (!mentor) {
      cleanCookie(res, "accessToken");
      return serverError(res);
    }

    if (mentor?._id) {
      return res.send({ status: "success", user: mentor });
    }

    return serverError(res);
  } catch (error) {
    handleDefaultErr(error);
    return serverError(res);
  }
};

export default appInit;

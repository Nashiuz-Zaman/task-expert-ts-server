// core
import { Request, Response } from "express";
import { clientUrl } from "../../../app";

// models
import { User } from "../../models/User/User";
import { Mentor } from "../../models/Mentor/Mentor";
import { handleDefaultErr, serverError, setCookie } from "../../../../utils";
import { IEmail, sendEmail } from "../../../../utils/email";

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const html: string = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://res.cloudinary.com/dydv6uxzo/image/upload/v1720609538/abroad-portal/Logo%20images/logo_abroad_portal_qznp0t.png" alt="Abroad Portals Logo" style="max-width: 150px; margin-bottom: 20px;">
        </div>
        <div style="text-align: center;">
            <h1 style="color: #111; font-size: 24px; margin-bottom: 10px;">Password Reset Request</h1>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">We received a request to reset your password for your Abroad Portals account. Please click the button below to reset your password:</p>
            <a href="${`${clientUrl}/password-reset`}" style="display: inline-block; font-size: 18px; font-weight: bold; background-color: #FF9811; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-bottom: 30px;">Reset Password</a>
            <p style="font-size: 16px; line-height: 1.5; margin-top: 30px;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
            <p style="margin: 5px 0;">&copy; 2024 Abroad Portals. All rights reserved.</p>
            <p style="margin: 5px 0;">This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>`;

  try {
    const { email } = req.body;
    const checkUsers = User.findOne({ email: email }).exec();
    const checkMentors = Mentor.findOne({ email: email }).exec();
    const [user, mentor] = await Promise.all([checkUsers, checkMentors]);

    if (!user && !mentor) {
      return res
        .status(400)
        .send({ status: "failure", message: "No user found with this email" });
    }

    if (user?._id) {
      if (user.isGoogleAccount) {
        return res.status(403).send({
          status: "failure",
          message: "Google user exists, please continue with google",
        });
      }
    }

    if (user?._id || mentor?._id) {
      const email = (user?.email || mentor?.email) as string;
      const role = user?._id ? "student" : "mentor";

      const emailOptions: IEmail = {
        from: "resetpassword@abroad-portals.com",
        to: email,
        subject: "Password Reset Link",
        html,
      };

      const result = await sendEmail(emailOptions);

      if (result) {
        setCookie(res, "password-reset", { email, role }, 60000 * 30);
        return res.send({ status: "success" });
      }

      return serverError(res);
    }

    return serverError(res);
  } catch (err) {
    handleDefaultErr(err);
    return serverError(res);
  }
};

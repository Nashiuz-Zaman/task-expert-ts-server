// core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// models
import { User } from '../../models/User/User';

import {
   cleanCookie,
   handleDefaultErr,
   serverError,
   setCookie,
} from '../../utils';
import { IEmail, sendEmail } from '../../utils/email';

export const changePassword = async (
   req: Request,
   res: Response
): Promise<Response> => {
   try {
      const cookies = req.cookies;
      const { email, role } = cookies['password-reset'];
      const { password } = req.body;

      const html: string = `<html>
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
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">Your password for your account was changed.</p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">If you did not make this change, please reset your password immediately and contact our support team at support@abroadportals.com.</p>           
        </div>
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
            <p style="margin: 5px 0;">&copy; 2024 Abroad Portals. All rights reserved.</p>
            <p style="margin: 5px 0;">This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>`;

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let record;

      if (role === 'student') {
         record = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
         );
      }

      if (record?._id) {
         const emailOptions: IEmail = {
            from: 'support@abroad-portals.com',
            to: email,
            subject: 'Password was changed',
            html,
         };

         await sendEmail(emailOptions);

         // clear the cookie
         cleanCookie(res, 'password-reset');
         return res.send({ status: 'success' });
      }

      return serverError(res);
   } catch (err) {
      handleDefaultErr(err);
      return serverError(res);
   }
};

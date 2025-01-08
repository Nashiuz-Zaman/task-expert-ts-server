import { IEmail, sendEmail } from "./email";

export const sendOTP = async (
  otp: string,
  email: string,
  subject?: string
): Promise<boolean> => {
  const html: string = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden;">
        
        <!-- Header Section with Logo and Image -->
        <table role="presentation" style="width: 100%; border-spacing: 0; border-collapse: collapse;">
            <tr>
                <td style="padding: 20px; vertical-align: middle;">
                    <img src="https://res.cloudinary.com/dydv6uxzo/image/upload/v1720609538/abroad-portal/Logo%20images/logo_abroad_portal_qznp0t.png" alt="Abroad Portals Logo" style="max-width: 180px; height: auto; display: block;">
                </td>
                <td style="text-align: right; vertical-align: top;">
                    <div style="width: 200px; height: 200px; background-color: #e6e6e6; border-bottom-left-radius: 50%; background-image: url('https://www.unidirection.com/wp-content/uploads/2019/10/3rd.jpg'); background-size: cover; background-position: center; display: inline-block;"></div>
                </td>
            </tr>
        </table>


        <!-- Content Section -->
        <div style="padding: 20px;">
        <div style="text-align: center;">
            <h1 style="color: #111; font-size: 24px; margin-bottom: 10px;">Account Verification</h1>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">Thank you for signing up with Abroad Portals! To complete your registration, please enter the following One-Time Password (OTP) on the verification page:</p>
            <div style="display: inline-block; font-size: 24px; font-weight: bold; background-color: #FF9811; color: #ffffff; padding: 10px 20px; border-radius: 5px; letter-spacing: 10px;">${otp}</div>
            <p style="font-size: 16px; line-height: 1.5; margin-top: 30px;">If you did not request this, please ignore this email.</p>
        </div>

        <!-- Footer Section -->
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 20px;">
            <p style="margin: 5px 0;">&copy; 2024 Abroad Portals. All rights reserved.</p>
            <p style="margin: 5px 0;">This is an automated message, please do not reply.</p>
        </div>
        </div>        
        
    
    </div>
</body>
</html>`;

  const emailOptions: IEmail = {
    from: "otp@abroad-portals.com",
    to: email,
    subject: subject || "OTP Verification",
    html,
  };

  return await sendEmail(emailOptions);
};

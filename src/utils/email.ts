// core
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { handleDefaultErr } from "./handleDefaultErr";

dotenv.config();

export interface IEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (emailDetails: IEmail): Promise<boolean> => {
  try {
    const { from, to, subject, html } = emailDetails;
    const smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendResult = await smtpTransport.sendMail({
      from,
      to,
      subject,
      html,
    });

    if (sendResult.messageId) {
      return true;
    }
    return false;
  } catch (err) {
    handleDefaultErr(err);
    return false;
  }
};

// core
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import { handleDefaultErr } from './handleDefaultErr';
import { SendEmail } from '../types/sendEmail';

export const sendEmail: SendEmail = async emailDetails => {
   try {
      const { from, to, subject, html } = emailDetails;
      const smtpTransport = nodemailer.createTransport({
         host: 'smtp.gmail.com',
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

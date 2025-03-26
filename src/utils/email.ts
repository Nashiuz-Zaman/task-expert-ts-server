// core
import nodemailer from 'nodemailer';
import { handleDefaultErr } from './handleDefaultErr';
import { SendEmail } from '../shared/type/email';
import { config } from '../config/env';

export const sendEmail: SendEmail = async emailDetails => {
   try {
      const { from, to, subject, html } = emailDetails;
      const smtpTransport = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         auth: {
            user: config.user,
            pass: config.appPass,
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

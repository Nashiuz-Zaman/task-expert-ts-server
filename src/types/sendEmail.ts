export interface IEmail {
   from: string;
   to: string;
   subject: string;
   html: string;
}

export type SendEmail = (emailDetails: {
   from: IEmail['from'];
   to: IEmail['to'];
   subject: IEmail['subject'];
   html: IEmail['html'];
}) => Promise<boolean>;

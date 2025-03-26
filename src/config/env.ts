import dotenv from 'dotenv';
import path from 'path';

// load env variables
dotenv.config({ path: path.resolve(process.cwd(), 'env/.env') });

export const config = {
   port: (process.env.PORT || '5000') as string,
   environment: process.env.NODE_ENV as string,
   mongoUri: process.env.MONGO_URI as string,
   
   devClientDomain: process.env.DEV_CLIENT_DOMAIN as string,
   devClientURL: process.env.DEV_CLIENT_URL as string,
   prodClientDomain: process.env.PROD_CLIENT_DOMAIN as string,
   prodClientURL: process.env.PROD_CLIENT_URL as string,
   
   user: process.env.EMAIL_USER as string,
   appPass: process.env.EMAIL_PASS as string,
};

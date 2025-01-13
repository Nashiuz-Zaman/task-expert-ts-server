// import
import mongoose from 'mongoose';
import { handleDefaultErr } from '../utils';

interface IConnection {
   isConnected: boolean;
}

const connection: IConnection = { isConnected: false };

const connectDb = async (): Promise<void> => {
   try {
      if (connection.isConnected) {
         return;
      }

      const db = await mongoose.connect(
         // `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?readPreference=primary&ssl=false`
         'mongodb://127.0.0.1:27017/task-expert-dev'
      );

      console.log('Database connected correctly ✅✅✅');

      connection.isConnected = true;
   } catch (err) {
      connection.isConnected = false;
      console.log('error block');
      handleDefaultErr(err);
   }
};

export default connectDb;

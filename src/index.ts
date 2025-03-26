import http from 'http';
import app, { clientDomain, clientUrl } from './app/app';
import { connectDb } from './config/db';
import { config } from './config/env';

// Create server and define port
const server = http.createServer(app);
const port = config.port

// Graceful shutdown
const gracefulShutdown = () => {
   console.log('Server shutting down...');
   server.close(() => {
      console.log('✅ Server closed. Exiting process.');
      process.exit(0);
   });
};

// Initialize server
const initServer = async (): Promise<void> => {
   await connectDb();

   try {
      app.listen(port, () => {
         console.log(
            `- Server working\n- Port: ${port}\n- Environment: ${config.environment}\n- Client Domain: ${clientDomain}\n- Client URL: ${clientUrl}`
         );
      });
   } catch (error) {
      console.error(`Server failed ❌❌\n${error}`);
      process.exit(1);
   }

   // Handle graceful shutdown
   process.on('SIGINT', gracefulShutdown);
   process.on('SIGTERM', gracefulShutdown);
};

initServer();

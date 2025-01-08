import dotenv from "dotenv";
import http from "http";
import app, { clientDomain, clientUrl } from "./app/app";
import connectDb from "./db/connectDb";

// Load environment variables
dotenv.config();

// Create server and define port
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Initialize server
const initServer = async (): Promise<void> => {
  await connectDb();

  server.listen(port, () => {
    console.log(
      `- Server working\n- Port: ${port}\n- Environment: ${process.env.NODE_ENV}\n- Client Domain: ${clientDomain}\n- Client URL: ${clientUrl}`
    );
  });
};

initServer();

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import Mainrouter from "./router";
import SocketServer from "./socket";

const app = express();
app.use(cors());
app.use(bodyParser.json());
Mainrouter(app); //for handelling the routes across the server

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

SocketServer(io);

httpServer.listen(8080, () => {
  console.log("server is listening on http://localhost:8080 :)");
});

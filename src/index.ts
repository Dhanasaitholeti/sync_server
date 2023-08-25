import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import Mainrouter from "./router";
import {
  addConnectionStatus,
  removeConnectionStatus,
  sendDatatoConncetion,
} from "./helpers/socket";
import { socketAuth } from "./middlewares/AuthMiddleware";

const app = express();
app.use(cors());
app.use(bodyParser.json());
Mainrouter(app); //for handelling the routes across the server

const httpServer = createServer(app);
const io = new Server(httpServer);

io.use(socketAuth).on("connection", async (socket) => {
  socket.on("set", async (Data) => {
    await addConnectionStatus(Data, socket.id);
    console.log("A client connected to the websocket");
  });

  socket.on("sendMessage", (Data) => {
    sendDatatoConncetion(io, "hello");
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected");
    await removeConnectionStatus(socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log("server is listening on http://localhost:8080 :)");
});

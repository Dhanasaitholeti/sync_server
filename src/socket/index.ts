import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import {
  addConnectionStatus,
  removeConnectionStatus,
  sendDatatoConncetion,
} from "../helpers/socket";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    console.log("A client connected to the websocket");
    console.log(socket.id);

    socket.on("sendMessage", (Data) => {
      sendDatatoConncetion(io, "hello");
    });

    socket.on("disconnect", async () => {
      console.log("Client disconnected");
    });
  });
};

export default setSocket;

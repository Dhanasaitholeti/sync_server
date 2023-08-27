import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import { addConnectionStatus } from "../helpers/socket";
import eventHandler from "./events";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    await addConnectionStatus(socket.userData.id.toString(), socket.id);
    console.log("client connected");
    eventHandler(io, socket);
  });
};

export default setSocket;

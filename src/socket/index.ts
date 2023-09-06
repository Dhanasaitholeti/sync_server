import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import { addConnectionStatus } from "../helpers/socket";
import eventHandler from "./events";
import initData from "./events/initData";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    await addConnectionStatus(socket.userData.id.toString(), socket.id);
    console.log("a user connected");
    await initData(io, socket);

    eventHandler(io, socket);
  });
};

export default setSocket;

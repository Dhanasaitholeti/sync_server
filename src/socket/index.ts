import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import { addConnectionStatus } from "../helpers/socket";
import eventHandler from "./events";
import initData from "./events/initData";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    //Below events fired when a authenticated user connected to the server successfully
    await addConnectionStatus(socket.userData.id.toString(), socket.id);
    console.log("a user connected");
    await initData(io, socket);

    //handleing other events
    eventHandler(io, socket);
  });
};

export default setSocket;

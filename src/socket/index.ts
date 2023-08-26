import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import { addConnectionStatus } from "../helpers/socket";
import disconnect from "./events/disconnect";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    await addConnectionStatus(socket.userData.id.toString(), socket.id);
    console.log("client connected");

    disconnect(socket);
  });
};

export default setSocket;

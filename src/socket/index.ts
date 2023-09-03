import { Server } from "socket.io";
import { socketAuth } from "../middlewares/AuthMiddleware";
import { addConnectionStatus } from "../helpers/socket";
import eventHandler from "./events";
import { getUserChatsWithId } from "../helpers";

const setSocket = (io: Server) => {
  io.use(socketAuth).on("connection", async (socket) => {
    await addConnectionStatus(socket.userData.id.toString(), socket.id);
    const chatsData = await getUserChatsWithId(socket.userData.id.toString());
    socket.emit("message", JSON.stringify(chatsData));
    eventHandler(io, socket);
  });
};

export default setSocket;

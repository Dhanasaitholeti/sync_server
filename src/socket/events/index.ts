import { Server, Socket } from "socket.io";
import chat from "./chat";
import disconnect from "./disconnect";

const eventHandler = async (io: Server, socket: Socket) => {
  chat(io, socket);
  disconnect(socket);
};

export default eventHandler;

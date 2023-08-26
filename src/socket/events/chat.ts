import { sendDatatoConncetion } from "../../helpers/socket";
import { Server, Socket } from "socket.io";

const chat = async (io: Server, socket: Socket) => {
  socket.on("sendMessage", (Data) => {
    sendDatatoConncetion(io, "hello");
  });
};

export default chat;

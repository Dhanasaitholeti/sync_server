import { sendDatatoConncetion } from "../../helpers/socket";
import { Server, Socket } from "socket.io";

const chat = async (io: Server, socket: Socket) => {
  socket.on("sendMessage", async (Data) => {
    await sendDatatoConncetion(io, socket, Data);
  });
};

export default chat;

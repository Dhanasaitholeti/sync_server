import { createChat, sendDatatoConncetion } from "../../helpers/socket";
import { Server, Socket } from "socket.io";

const chat = async (io: Server, socket: Socket) => {
  socket.on("sendMessage", async (Data) => {
    await sendDatatoConncetion(io, socket, Data);
  });

  socket.on("createChat", async (Data) => {
    await createChat(io, socket, Data);
  });
};

export default chat;

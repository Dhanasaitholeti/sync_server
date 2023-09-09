import { getChatMessagesWithChatId } from "../../helpers";
import { sendDatatoConncetion } from "../../helpers/socket";
import { Server, Socket } from "socket.io";

const chat = async (io: Server, socket: Socket) => {
  socket.on("GetChatMessages", async (Data) => {
    console.log("Inside chats events");
    const ChatMessages = await getChatMessagesWithChatId(Data.chatId);
    socket.emit("chatmessages", ChatMessages);
  });

  socket.on("sendMessage", async (Data) => {
    await sendDatatoConncetion(io, Data);
    console.log(Data);
  });
};

export default chat;

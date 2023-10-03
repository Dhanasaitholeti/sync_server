import { PrismaClient } from "@prisma/client";
import {
  GetDateTime,
  createChatForTwoUsers,
  createMessage,
  getChatPartner,
  getUserDataWithId,
} from "../helpers";
import { Server, Socket } from "socket.io";
const prisma = new PrismaClient();

export async function addConnectionStatus(
  userId: string,
  connectionId: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: "Active",
      connectionId: connectionId,
    },
  });
}

export async function removeConnectionStatus(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        connectionId: "",
        status: "InActive", // Set the status to "InActive"
        lastSeenAt: new Date(GetDateTime()),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendDatatoConncetion(
  io: Server,
  socket: Socket,
  Data: { chatId: string; senderId: string; content: string }
) {
  const { chatId, senderId, content } = Data;
  try {
    const newmsg = await createMessage(chatId, senderId, content);

    const ChatpartnerData = await getChatPartner(chatId, senderId);
    if (ChatpartnerData.members[0].status === "Active") {
      io.to(ChatpartnerData.members[0].connectionId).emit(
        "receive_messages",
        newmsg
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createChat(
  io: Server,
  socket: Socket,
  Data: { user1Id: string; user2Id: string }
) {
  const { user1Id, user2Id } = Data;

  const createdChat = await createChatForTwoUsers(user1Id, user2Id);
  const sendtouser1 = await getChatPartner(createdChat.id, user1Id);
  const sendtouser2 = await getChatPartner(createdChat.id, user2Id);

  if (sendtouser1.members[0].status === "Active")
    io.to(sendtouser1.members[0].connectionId).emit("newchat", {
      ChatId: createdChat.id,
      Chatpartner: sendtouser2.members[0].Name,
      ChatpartnerId: sendtouser2.members[0].id,
    });

  if (sendtouser2.members[0].status === "Active")
    io.to(sendtouser2.members[0].connectionId).emit("newchat", {
      ChatId: createdChat.id,
      Chatpartner: sendtouser1.members[0].Name,
      ChatpartnerId: sendtouser1.members[0].id,
    });
}

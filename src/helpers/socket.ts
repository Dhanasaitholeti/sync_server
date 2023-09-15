import { PrismaClient } from "@prisma/client";
import {
  GetDateTime,
  createMessage,
  getChatPartner,
  getUserDataWithEmail,
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
  Data: any
) {
  const { chatId, senderId, content } = Data;
  try {
    const newmsg = await createMessage(chatId, senderId, content);
    const mainuser = await getUserDataWithEmail(
      socket.userData.Email.toString()
    );
    io.to(mainuser.connectionId).emit("receive_messages", newmsg);

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

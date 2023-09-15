import { PrismaClient } from "@prisma/client";
import { GetDateTime, createMessage } from "../helpers";
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

export async function sendDatatoConncetion(io: Server, Data: any) {
  console.log(Data);
  const { chatId, senderId, content } = Data;
  console.log(content);
  try {
    const newmsg = await createMessage(chatId, senderId, content);
  } catch (err) {
    console.log(err);
  }
}

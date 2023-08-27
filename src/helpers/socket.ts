import { PrismaClient } from "@prisma/client";
import { GetDateTime } from "../helpers";
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
      connectionId: {
        push: connectionId,
      },
    },
  });
}

export async function removeConnectionStatus(
  userId: string,
  connectionId: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const updatedConnectionIds = user.connectionId.filter(
      (id) => id !== connectionId
    );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        connectionId: [],
        status: "InActive", // Set the status to "InActive"
        lastSeenAt: new Date(GetDateTime()),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendDatatoConncetion(io: Server, Data: any) {
  const { userId, message } = JSON.parse(Data);
  const connectionidData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      connectionId: true,
    },
  });
  const newmsg = await prisma.message.create({
    data: {
      content: message,
      senderId: userId,
      chatId: "580f4212-760a-4c79-be5f-40dea46979b1",
    },
  });

  io.to(connectionidData.connectionId).emit("message", `Message for you`);
}

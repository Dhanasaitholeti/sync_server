import { PrismaClient } from "@prisma/client";
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
      connectionId: {
        push: connectionId,
      },
    },
  });
}

export async function removeConnectionStatus(connectionId: string) {}

export async function sendDatatoConncetion(io: Server, userId: string) {
  const connectionidData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      connectionId: true,
    },
  });
  console.log(connectionidData);
  io.to(connectionidData.connectionId).emit("message", `Message for you`);
}

import { PrismaClient } from "@prisma/client";
import { Server, Socket } from "socket.io";
const prisma = new PrismaClient();

export async function addConnectionStatus(
  userId: string,
  connectionId: string
) {
  await prisma.activeconnection.create({
    data: {
      userId,
      connectionId: connectionId,
    },
  });
}

export async function removeConnectionStatus(connectionId: string) {
  await prisma.activeconnection.deleteMany({
    where: {
      connectionId: connectionId,
    },
  });
}

export async function sendDatatoConncetion(io: Server, connectionId: string) {
  const connectionidData = await prisma.activeconnection.findFirst({
    where: {
      userId: "client1",
    },
    select: {
      connectionId: true,
    },
  });
  console.log(connectionidData);
  io.to(connectionidData.connectionId).emit("message", `Message for you`);
}

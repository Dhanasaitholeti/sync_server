import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
const prisma = new PrismaClient();

export async function addConnectionStatus(
  userId: string,
  connectionId: string
) {
  await prisma.activeconnections.create({
    data: {
      userId,
      connectionid: connectionId,
    },
  });
}

export async function removeConnectionStatus(connectionId: string) {
  await prisma.activeconnections.deleteMany({
    where: {
      connectionid: connectionId,
    },
  });
}

export async function sendDatatoConncetion(io: any, connectionId: string) {
  const connectionidData = await prisma.activeconnections.findFirst({
    where: {
      userId: "client1",
    },
    select: {
      connectionid: true,
    },
  });
  console.log(connectionidData);
  io.to(connectionidData.connectionid).emit("message", `Message for you`);
}

import { PrismaClient } from "@prisma/client";
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserDataWithEmail(Email: string) {
  const Data = await prisma.user.findFirst({
    where: {
      Email,
    },
  });
  return Data;
}

export function GetDateTime() {
  const utcTimestamp = Date.now(); // Get the current UTC timestamp in milliseconds
  const istTimestamp = utcTimestamp + 5.5 * 60 * 60 * 1000; // Convert to IST

  return new Date(istTimestamp);
}

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

export async function getUserChatsWithId(id: string) {
  const Chats = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      chats: {
        select: {
          id: true,
          messages: true,
          members: {
            where: {
              NOT: {
                id: id, // Filter out the member with the connected ID
              },
            },
            select: {
              Name: true,
            },
          },
        },
      },
    },
  });

  return Chats;
}

export async function getChatMessagesWithChatId(chatId: string) {
  const chatMessages = await prisma.chat.findFirst({
    where: {
      id: chatId,
    },
    include: {
      messages: true,
    },
  });

  return chatMessages;
}

export function GetDateTime() {
  const utcTimestamp = Date.now(); // Get the current UTC timestamp in milliseconds
  const istTimestamp = utcTimestamp + 5.5 * 60 * 60 * 1000; // Convert to IST

  return new Date(istTimestamp);
}

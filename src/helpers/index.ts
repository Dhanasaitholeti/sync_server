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

export async function getChatPartner(ChatId: string, senderId: string) {
  const chatpartnerdata = await prisma.chat.findUnique({
    where: {
      id: ChatId,
    },
    include: {
      members: {
        where: {
          NOT: {
            id: senderId,
          },
        },
        select: {
          id: true,
          status: true,
          connectionId: true,
        },
      },
    },
  });

  return chatpartnerdata;
}

export async function createMessage(
  chatId: string,
  senderId: string,
  content: string
) {
  const newmsg = await prisma.message.create({
    data: {
      content,
      senderId,
      chatId,
    },
  });
  return newmsg;
}

export function GetDateTime() {
  const utcTimestamp = Date.now(); // Get the current UTC timestamp in milliseconds
  const istTimestamp = utcTimestamp + 5.5 * 60 * 60 * 1000; // Convert to IST

  return new Date(istTimestamp);
}

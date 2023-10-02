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

export async function createChatForTwoUsers(user1Id: string, user2Id: string) {
  const newChat = await prisma.chat.create({
    data: {
      members: {
        connect: [{ id: user1Id }, { id: user2Id }],
      },
    },
  });

  return newChat;
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
              id: true,
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
  console.log(chatpartnerdata);
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

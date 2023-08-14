import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createChat(req: Request, res: Response) {
  const { sender, UserId } = req.body;
  try {
    const newChat = await prisma.chat.create({
      data: {
        members: {
          connect: [{ id: UserId }],
        },
      },
    });

    const updateduser = await prisma.user.update({
      where: { id: sender },
      data: {
        chats: {
          connect: [{ id: newChat.id }],
        },
      },
    });

    const userChats = await prisma.user.findUnique({
      where: { id: sender },
      include: {
        chats: true, // Retrieve all fields from the Chat model
      },
    });

    console.log("added the user to the chat");
    console.log(updateduser);
    res.status(200).json({ Data: userChats });
  } catch (error) {
    console.log(error);
  }
}

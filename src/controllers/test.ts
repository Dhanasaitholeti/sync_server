import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function connections(req: Request, res: Response) {
  try {
    const connectionData = await prisma.activeconnection.findMany({});
    res.status(200).json({ Data: connectionData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to get connections" });
  }
}

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

export async function chatData(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const chatdata = await prisma.chat.findFirst({
      where: {
        id,
      },
      include: {
        members: true,
        messages: true,
      },
    });
    res.status(200).json({ Data: chatdata });
  } catch (error) {
    console.log(error);
  }
}

export async function deletechat(req: Request, res: Response) {
  const { id } = req.body;
  try {
    await prisma.chat.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "chat deleted" });
  } catch (error) {
    console.log(error);
  }
}

export async function getchats(req: Request, res: Response) {
  try {
    const chats = await prisma.chat.findMany({});
    res.status(200).json({ Data: chats });
  } catch (error) {
    console.log(error);
  }
}

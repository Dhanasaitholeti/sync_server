import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserChatsWithId, createMessage } from "../helpers";
const prisma = new PrismaClient();

export async function createChat(req: Request, res: Response) {
  //Imp
  const { User1, UserId } = req.body;
  try {
    const newChat = await prisma.chat.create({
      data: {
        members: {
          connect: [{ id: UserId }],
        },
      },
    });

    const updateduser = await prisma.user.update({
      where: { id: User1 },
      data: {
        chats: {
          connect: [{ id: newChat.id }],
        },
      },
    });

    const userChats = await prisma.user.findUnique({
      where: { id: User1 },
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
  //Imp
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

export async function getchatswithId(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const chats = await getUserChatsWithId(id);
    res.status(200).json({ Data: chats });
  } catch (error) {
    console.log(error);
  }
}

export async function createMsg(req: Request, res: Response) {
  console.log(req.body);
  const { chatId, senderId, content } = req.body;

  try {
    const newmsg = createMessage(chatId, senderId, content);
    res
      .status(201)
      .json({ message: "New message is created in the chat with the chat id" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating message", error });
  }
}

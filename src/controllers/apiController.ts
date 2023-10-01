import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createChatForTwoUsers, getUserDataWithEmail } from "../helpers";
const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        Name: true,
        Email: true,
      },
    });
    console.log(users);
    res.status(200).json({ Data: users });
  } catch (error) {
    res.status(400).json({
      message: "unable to get users",
    });
    console.log(error);
  }
}

export async function ProfileFetcher(req: Request, res: Response) {
  try {
    const Data = await getUserDataWithEmail(req.userData.Email.toString());
    res.status(200).json({ Data });
  } catch (error) {
    console.log(error);
  }
}

export async function createChat(req: Request, res: Response) {
  const { user1Id, user2Id } = req.body;

  try {
    const createdChat = await createChatForTwoUsers(user1Id, user2Id);
    res.status(201).json({ Data: createdChat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error unable to create chat" });
  }
}

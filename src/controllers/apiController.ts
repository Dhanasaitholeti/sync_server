import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
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
  res.status(200).json({ message: "This is from the Profile api" });
}

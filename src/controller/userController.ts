import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createuser(req: Request, res: Response) {
  console.log(req.body);
  const { name, Email } = req.body;
  console.log(name, Email);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        Email,
      },
    });
    console.log("A new User is Creates successfully");
    res.status(201).json({
      message: "User created successfully",
      Data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
    });
    console.log(error);
    console.log("Error happened");
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    res.status(200).json({ Data: users });
  } catch (error) {
    res.status(400).json({
      message: "unable to get users",
    });
    console.log(error);
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteduser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log("successfully deleted the user");
    res.json({ message: "succesfully deleted the user", data: deleteduser });
  } catch (error) {
    res.status(400).json({ message: "unable to delete user" });
    console.log(error);
  }
}

export { createuser, getUsers, deleteUser };

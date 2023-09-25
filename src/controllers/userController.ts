import bcrypt from "bcryptjs";
import { tokenGenerator } from "../helpers/tokenGenerator";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserDataWithEmail } from "../helpers/index";
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

export async function Signup(req: Request, res: Response) {
  const { Email, Name, Password } = req.body;
  try {
    const EmailUsersData = await getUserDataWithEmail(Email);
    if (EmailUsersData)
      return res.send(400).json({
        message: "Email is already in use, Try with a different email",
      });

    const salt = await bcrypt.genSalt(10);
    const PasswordHash = await bcrypt.hash(Password, salt);

    const NewUser = await prisma.user.create({
      data: {
        Name,
        Email,
        PasswordHash,
      },
    });
    res.status(201).json({ message: "Created New User", Data: NewUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to create new Account" });
  }
}

export async function Login(req: Request, res: Response) {
  const { Email, Password } = req.body;
  try {
    const EmailUsersData = await getUserDataWithEmail(Email);
    if (!EmailUsersData)
      return res.status(403).json({ message: "Invalid Credentials" });

    const passwdRes = await bcrypt.compare(
      Password,
      EmailUsersData.PasswordHash
    );

    if (!passwdRes)
      return res
        .status(403)
        .json({ message: "Password provided is incorrect" });

    const token = await tokenGenerator({
      UserId: EmailUsersData.id,
      Email: EmailUsersData.Email,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to login" });
  }
}

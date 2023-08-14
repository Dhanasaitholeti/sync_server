import bcrypt from "bcryptjs";
import { tokenGenerator } from "../helpers/tokenGenerator";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserDataWithEmail } from "../helpers/index";
const prisma = new PrismaClient();

async function createuser(req: Request, res: Response) {
  const { Name, Email, Password } = req.body;
  try {
    const existeduser = await prisma.user.findFirst({
      where: {
        Email,
      },
    });
    if (existeduser)
      return res.status(401).json({
        message: "Email is already in use, Try with a different email",
      });
    const user = await prisma.user.create({
      data: {
        Name,
        Email,
        Password,
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

async function Signup(req: Request, res: Response) {
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
        Password: PasswordHash,
      },
    });
    res.status(201).json({ message: "Created New User", Data: NewUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "unable to create new Account" });
  }
}

async function Login(req: Request, res: Response) {
  const { Email, Password } = req.body;
  try {
    const EmailUsersData = await getUserDataWithEmail(Email);
    if (!EmailUsersData)
      return res.status(403).json({ message: "Invalid Credentials" });

    const passwdRes = await bcrypt.compare(Password, EmailUsersData.Password);

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

export { createuser, getUsers, deleteUser, Login, Signup };

import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";
import { Socket } from "socket.io";
import { getUserDataWithEmail } from "../helpers";

interface UserData {
  id: String;
  Name: String;
  Email: String;
}

declare module "socket.io" {
  interface Socket {
    userData: UserData | null;
  }
}

const socketAuth = async (socket: Socket, next: () => void) => {
  try {
    const token = socket.handshake.auth.token;
    const authResult = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
    socket.userData = await getUserDataWithEmail(authResult.Email);
    next();
  } catch (error) {
    console.log(error);
    socket.emit("auth_error", { message: error.message });
    socket.disconnect(true);
  }
};

declare global {
  namespace Express {
    interface Request {
      userData: UserData | null;
    }
  }
}

const authmiddleware = async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
      req.userData = await getUserDataWithEmail(decoded.Email);
      next();
    } catch (error) {
      res.status(400).send("please try to login");
    }
  } else {
    res.status(401).send("please try to login");
  }
};

export { socketAuth, authmiddleware };

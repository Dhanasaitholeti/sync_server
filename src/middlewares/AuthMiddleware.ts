import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";
import { Socket } from "socket.io";
import { getUserDataWithEmail } from "../helpers";

const socketAuth = (socket: Socket, next: () => void) => {
  try {
    const token = socket.handshake.auth.token;
    const authResult = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    socket.emit("auth_error", { message: error.message });
    socket.disconnect(true);
  }
};

interface UserData {
  id: String;
  Name: String;
  Email: String;
}

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
    } catch (error) {
      res.status(400).send("please try to login");
    }
  } else {
    res.status(401).send("please try to login");
  }
};

export { socketAuth };

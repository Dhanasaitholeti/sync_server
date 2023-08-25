import { Socket } from "socket.io";
const socketAuth = (socket: Socket, next: () => void) => {
  next();
};

export { socketAuth };

import { Socket } from "socket.io";
import { removeConnectionStatus } from "../../helpers/socket";
const disconnect = (socket: Socket) => {
  socket.on("disconnect", async () => {
    await removeConnectionStatus(socket.id);
    console.log(`client with connection id ${socket.id} is disconnected `);
  });
};
export default disconnect;

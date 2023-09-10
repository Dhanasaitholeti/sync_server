import { getUserChatsWithId, getUserDataWithEmail } from "../../helpers";
import { Server, Socket } from "socket.io";

const initData = async (io: Server, socket: Socket) => {
  const chatsData = await getUserChatsWithId(socket.userData.id.toString());
  io.to(chatsData.connectionId).emit("chatsData", chatsData);
};

export default initData;

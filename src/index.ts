import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./router/userRoutes";
import testRoutes from "./router/testroute";
import { addConnectionStatus, removeConnectionStatus } from "./helpers/socket";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Hello from Http Server" });
});

app.use("/user", userRoutes);
app.use("/test", testRoutes); ////// This is for Testing new features and incrementally implement in the app.

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  await addConnectionStatus("This is userid bech", socket.id);
  console.log("A client connected to the websocket");

  socket.on("disconnect", async () => {
    await removeConnectionStatus(socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log("server is listening on http://localhost:8080 :)");
});

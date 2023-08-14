import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./router/userRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Hello from Http Server" });
});

app.use("/user", userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A clien connected to the websocket");
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

httpServer.listen(8080, () => {
  console.log("server is listening on http://localhost:8080 :)");
});

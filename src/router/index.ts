import * as express from "express";
import userRoutes from "../router/userRoutes";
import testRoutes from "../router/testroute";
import apiRoutes from "./apiroute";
import { getUserChatsWithId } from "../helpers";
// import { getchatswithId } from "controllers/test";

const Mainrouter = (app: express.Application): void => {
  app.get("/chatMsgs", async (req: express.Request, res: express.Response) => {
    const { chatId } = req.body;
    const Data = await getUserChatsWithId(chatId);
    res.status(200).json(Data);
  });

  app.use("/user", userRoutes);
  app.use("/api", apiRoutes);
  app.use("/test", testRoutes); ////// This is for Testing new features and incrementally implement in the app.
};

export default Mainrouter;

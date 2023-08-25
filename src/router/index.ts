import * as express from "express";
import userRoutes from "../router/userRoutes";
import testRoutes from "../router/testroute";

const Mainrouter = (app: express.Application): void => {
  app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "sucess with the routes part" });
  });
  app.use("/user", userRoutes);
  app.use("/test", testRoutes); ////// This is for Testing new features and incrementally implement in the app.
};

export default Mainrouter;

import * as express from "express";
const router = express.Router();
import { getUsers, Login, Signup } from "../controller/userController";

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getall", getUsers);

export default router;

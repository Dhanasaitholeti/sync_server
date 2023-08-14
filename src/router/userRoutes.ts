import * as express from "express";
const router = express.Router();
import { createuser, getUsers, deleteUser } from "../controller/userController";

router.post("/create", createuser);
router.get("/getall", getUsers);
router.delete("/delete/:id", deleteUser);

export default router;

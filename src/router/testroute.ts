import { createChat } from "../controller/test";
import express from "express";
const router = express.Router();

router.post("/createchat", createChat);

export default router;

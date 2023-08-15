import {
  createChat,
  chatData,
  getchats,
  deletechat,
  connections,
} from "../controllers/test";
import express from "express";
const router = express.Router();

router.post("/createchat", createChat);
router.post("/getchat", chatData);
router.get("/allchats", getchats);
router.delete("/deletechat", deletechat);
router.get("/connections", connections);

export default router;

import {
  createChat,
  chatData,
  getchats,
  deletechat,
  // connections,
  // deleteall,
} from "../controllers/test";
import express from "express";
const router = express.Router();

router.post("/createchat", createChat);
router.post("/getchat", chatData);
router.get("/allchats", getchats);
router.delete("/deletechat", deletechat);
// router.get("/connections", connections);

// router.delete("/deleteall", deleteall);

export default router;

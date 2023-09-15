import {
  createChat,
  chatData,
  getchats,
  deletechat,
  getchatswithId,
  createMsg,
  // connections,
  // deleteall,
} from "../controllers/test";
import express from "express";
const router = express.Router();

router.post("/createchat", createChat);
router.post("/getchat", chatData);
router.get("/allchats", getchats);
router.delete("/deletechat", deletechat);
router.get("/getchatsofuser", getchatswithId);
router.post("/createmessage", createMsg);
// router.get("/connections", connections);

// router.delete("/deleteall", deleteall);

export default router;

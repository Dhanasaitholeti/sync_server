import { authmiddleware } from "../middlewares/AuthMiddleware";
import {
  ProfileFetcher,
  createChat,
  getUsers,
} from "../controllers/apiController";
import { Router } from "express";
const router = Router();

router.get("/search", authmiddleware, getUsers);
router.get("/profile", authmiddleware, ProfileFetcher);
router.post("/createchat", createChat);

export default router;

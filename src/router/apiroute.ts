import { authmiddleware } from "../middlewares/AuthMiddleware";
import { ProfileFetcher, getUsers } from "../controllers/apiController";
import { Router } from "express";
const router = Router();

router.get("/search", authmiddleware, getUsers);
router.get("/profile", authmiddleware, ProfileFetcher);

export default router;

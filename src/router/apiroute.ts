import { ProfileFetcher, getUsers } from "../controllers/apiController";
import { Router } from "express";
const router = Router();

router.get("/search", getUsers);
router.get("/profile", ProfileFetcher);

export default router;

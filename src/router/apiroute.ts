import { EmailSearch, ProfileFetcher } from "../controllers/apiController";
import { Router } from "express";
const router = Router();

router.post("/search", EmailSearch);
router.get("/profile", ProfileFetcher);

export default router;

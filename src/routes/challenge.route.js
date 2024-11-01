import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import { getActiveChallenges, completeChallenge } from "../controllers/challenge.controller.js";

const router = Router();

// Fetch active challenges
router.get("/challenges", protect, getActiveChallenges);

// Mark challenge as complete
router.post("/complete-challenge", protect, completeChallenge);

export default router;

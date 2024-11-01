import express from "express";
import protect from "../middleware/auth.middleware.js";
import { listRewards, redeemReward } from "../controllers/reward.controller.js";

const router = express.Router();

// Endpoint to list available rewards
router.get("/rewards", protect, listRewards);

// Redeem reward route
router.post("/redeem-reward", protect, redeemReward);

export default router;

import express from "express";
import { getCampusLeaderboard, getCourseLeaderboard } from "../controllers/leaderboard.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for campus-wide leaderboard
router.get("/campus-leaderboard", protect, getCampusLeaderboard);

// Route for course-specific leaderboard
router.get("/course-leaderboard/:courseId", protect, getCourseLeaderboard);

export default router;

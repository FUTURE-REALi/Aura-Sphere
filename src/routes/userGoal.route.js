import express from "express";
import {
    addOrUpdateGoal,
    removeGoal,
    addOrUpdateCourseSchedule,
    removeCourseFromSchedule,
    updateGoalProgress,
    getGoalsWithProgress
} from "../controllers/userGoal.controller.js";

const router = express.Router();

// Routes for managing goals
router.post('/user/:userId/goals', addOrUpdateGoal);
router.delete('/user/:userId/goals/:goalId', removeGoal);

// Routes for managing course schedules
router.post('/user/:userId/schedule', addOrUpdateCourseSchedule);
router.delete('/user/:userId/schedule/:courseId', removeCourseFromSchedule);

// Routes for updating and fetching goals progress
router.patch('/user/:userId/progress', updateGoalProgress);
router.get('/user/:userId/goals', getGoalsWithProgress);

export default router;

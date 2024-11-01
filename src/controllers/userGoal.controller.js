import { User } from "../models/user.model.js";

// Add or update an academic goal
export const addOrUpdateGoal = async (req, res) => {
    const { userId } = req.params;
    const { goalId, goalDetails } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedGoals = await user.addOrUpdateGoal(goalId, goalDetails);
        res.status(200).json({ message: "Goal added/updated successfully", goals: updatedGoals });
    } catch (error) {
        res.status(500).json({ message: "Error updating goal", error });
    }
};

// Remove an academic goal
export const removeGoal = async (req, res) => {
    const { userId, goalId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedGoals = await user.removeGoal(goalId);
        res.status(200).json({ message: "Goal removed successfully", goals: updatedGoals });
    } catch (error) {
        res.status(500).json({ message: "Error removing goal", error });
    }
};

// Add or update a course schedule
export const addOrUpdateCourseSchedule = async (req, res) => {
    const { userId } = req.params;
    const { courseId, courseDetails } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedSchedule = await user.addOrUpdateCourse(courseId, courseDetails);
        res.status(200).json({ message: "Course schedule added/updated successfully", schedule: updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: "Error updating course schedule", error });
    }
};

// Remove a course from the schedule
export const removeCourseFromSchedule = async (req, res) => {
    const { userId, courseId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedSchedule = await user.removeCourse(courseId);
        res.status(200).json({ message: "Course removed from schedule", schedule: updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: "Error removing course from schedule", error });
    }
};

// Update progress for a specific goal
export const updateGoalProgress = async (req, res) => {
    const { userId } = req.params;
    const { goalId, progressPercentage } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedProgress = await user.updateProgress(goalId, progressPercentage);
        res.status(200).json({ message: "Progress updated successfully", progress: updatedProgress });
    } catch (error) {
        res.status(500).json({ message: "Error updating progress", error });
    }
};

// Get all goals with their progress
export const getGoalsWithProgress = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const goalsWithProgress = await user.getGoalsWithProgress();
        res.status(200).json({ goals: goalsWithProgress });
    } catch (error) {
        res.status(500).json({ message: "Error fetching goals with progress", error });
    }
};

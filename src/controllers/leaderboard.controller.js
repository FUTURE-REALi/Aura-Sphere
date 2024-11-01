import { User } from "../models/user.model.js";

// Fetch campus-wide leaderboard
export const getCampusLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({})
            .sort({ aurapoints: -1 }) // Sort by Aura points in descending order
            .limit(10) // Limit to top 10
            .select("username aurapoints profilePicture"); // Select relevant fields

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch course-specific leaderboard
export const getCourseLeaderboard = async (req, res) => {
    const { courseId } = req.params;

    try {
        const leaderboard = await User.find({ enrolledCourses: courseId }) // Assume "enrolledCourses" in User model
            .sort({ aurapoints: -1 })
            .limit(10)
            .select("username aurapoints profilePicture");

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

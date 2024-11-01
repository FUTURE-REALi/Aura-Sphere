import { Challenge } from "../models/challenge.model.js";

// Fetch active challenges
export const getActiveChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true });
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark challenge as complete
export const completeChallenge = async (req, res) => {
    const { challengeId } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const challenge = await Challenge.findById(challengeId);
        if (!challenge || !challenge.isActive) {
            return res.status(404).json({ message: "Challenge not found or inactive" });
        }

        // Award Aura points to the user
        user.aurapoints = (user.aurapoints || 0) + challenge.rewardPoints;
        await user.save();

        // Deactivate the challenge
        challenge.isActive = false;
        await challenge.save();

        res.status(200).json({
            message: `Challenge completed! You earned ${challenge.rewardPoints} Aura points.`,
            aurapoints: user.aurapoints
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

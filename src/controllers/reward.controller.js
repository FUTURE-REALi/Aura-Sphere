import { User } from "../models/user.model.js";
import { rewards } from "../models/reward.model.js";

// List available rewards
export const listRewards = (req, res) => {
    res.json(rewards);
};

// Redeem reward
export const redeemReward = async (req, res) => {
    const { rewardId } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the reward from the hardcoded list
        const reward = rewards.find(r => r.id === rewardId);

        if (!reward) {
            return res.status(404).json({ message: "Reward not found" });
        }

        if (user.aurapoints < reward.auraPointsRequired) {
            return res.status(400).json({ message: "Not enough Aura points" });
        }

        // Deduct points and update user's reward history
        user.aurapoints -= reward.auraPointsRequired;
        await user.redeemReward(reward.name);

        res.status(200).json({ message: `Redeemed ${reward.name}`, aurapoints: user.aurapoints });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

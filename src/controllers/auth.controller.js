import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        console.error("Error with User.findOne:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login an existing user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Google OAuth callback
export const googleCallback = (req, res) => {
    res.redirect('/'); // Redirect to your frontend or a success page
};

// GitHub OAuth callback
export const githubCallback = (req, res) => {
    res.redirect('/'); // Redirect to your frontend or a success page
};

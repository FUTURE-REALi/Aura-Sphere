import express from "express";
import passport from "passport";
import protect from "../middleware/auth.middleware.js";
import {
    registerUser,
    loginUser,
    getUserProfile,
    googleCallback,
    githubCallback
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user profile
router.get("/profile", protect, getUserProfile);

// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleCallback);

// GitHub OAuth route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), githubCallback);

export default router;

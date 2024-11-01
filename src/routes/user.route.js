import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { protect } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(protect,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(protect, changeCurrentPassword)
router.route("/current-user").get(protect, getCurrentUser)
router.route("/update-account").patch(protect, updateAccountDetails)
router.route("/avatar").patch(protect, upload.single("avatar"), updateUserAvatar)

import passport from 'passport';
// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/'); // Redirect to your frontend or a success page
    }
);

// Auth with GitHub

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));


// GitHub callback route
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/'); // Redirect to a frontend route or success page
    }
);

export default router
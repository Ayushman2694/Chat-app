import express from "express";
import { changePassword, checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectRoute, updateProfile)
router.put("/change-password", protectRoute, changePassword)
router.get("/check", protectRoute, checkAuth)


export default router;
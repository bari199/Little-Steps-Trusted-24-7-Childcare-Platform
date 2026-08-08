import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public Routes */
router.post("/register", register);
router.post("/login", login);

/* Protected Routes */
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getCurrentUser);
router.put("/profile", authMiddleware, updateUserProfile);

export default router;

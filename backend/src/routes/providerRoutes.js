import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProviderProfile,
  getProviderProfile,
  updateProviderProfile,
} from "../controllers/providerController.js";

const router = express.Router();

router.post("/profile", authMiddleware, createProviderProfile);

router.get("/profile", authMiddleware, getProviderProfile);

router.put("/profile", authMiddleware, updateProviderProfile);

export default router;

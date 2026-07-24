import express from "express";

import {
  createSubscription,
  getMySubscriptions,
} from "../controllers/subscriptionController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("parent"), createSubscription);

router.get(
  "/my-subscriptions",
  authMiddleware,
  roleMiddleware("parent"),
  getMySubscriptions,
);

export default router;

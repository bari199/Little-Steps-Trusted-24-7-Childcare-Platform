import express from "express";

import {
  createSubscription,
  getMySubscriptions,
  getSubscriptionDetails,
  cancelSubscription,
  getProviderSubscriptions,
  getProviderSubscriptionAnalytics,
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

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("parent"),
  getSubscriptionDetails,
);

router.put(
  "/cancel/:id",
  authMiddleware,
  roleMiddleware("parent"),
  cancelSubscription,
);

router.get(
  "/provider-subscriptions",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderSubscriptions,
);

router.get(
  "/provider-subscriptions/analytics",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderSubscriptionAnalytics,
);

export default router;

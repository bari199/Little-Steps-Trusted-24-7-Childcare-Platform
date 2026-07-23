import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createProviderProfile,
  getProviderProfile,
  updateProviderProfile,
} from "../controllers/providerController.js";

const router = express.Router();

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("provider"),
  createProviderProfile,
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderProfile,
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("provider"),
  updateProviderProfile,
);

export default router;

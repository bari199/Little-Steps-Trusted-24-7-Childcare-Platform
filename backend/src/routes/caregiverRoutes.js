import express from "express";

import {
  createCaregiver,
  getCaregivers,
  getSingleCaregiver,
  getProviderCaregivers,
  updateCaregiver,
  deleteCaregiver,
} from "../controllers/caregiverController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getCaregivers);

// Provider Routes
router.get(
  "/provider",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderCaregivers,
);

router.post("/", authMiddleware, roleMiddleware("provider"), createCaregiver);

router.put("/:id", authMiddleware, roleMiddleware("provider"), updateCaregiver);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("provider"),
  deleteCaregiver,
);

// Dynamic Route (keep last)
router.get("/:id", getSingleCaregiver);

export default router;

import express from "express";

import {
  createCaregiver,
  getCaregivers,
  getSingleCaregiver,
  updateCaregiver,
  deleteCaregiver,
} from "../controllers/caregiverController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getCaregivers);

router.get("/:id", getSingleCaregiver);

router.post("/", authMiddleware, roleMiddleware("provider"), createCaregiver);

router.put("/:id", authMiddleware, roleMiddleware("provider"), updateCaregiver);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("provider"),
  deleteCaregiver,
);

export default router;

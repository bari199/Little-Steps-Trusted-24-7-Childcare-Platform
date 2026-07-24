import express from "express";

import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  approveBooking,
  rejectBooking,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("parent"), createBooking);

router.get(
  "/my-bookings",
  authMiddleware,
  roleMiddleware("parent"),
  getMyBookings,
);

router.get(
  "/provider",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderBookings,
);

router.patch(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("provider"),
  approveBooking,
);

router.patch(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("provider"),
  rejectBooking,
);

export default router;
